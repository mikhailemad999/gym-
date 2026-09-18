import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      relations: { role: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { role: true },
    });
  }

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: string;
    roleName?: string;
  }): Promise<User> {
    // Check existing
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    // Get role
    const roleName = data.roleName || 'client';
    const role = await this.roleRepository.findOne({ where: { name: roleName } });
    if (!role) {
      throw new NotFoundException(`Role "${roleName}" not found`);
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = this.userRepository.create({
      email: data.email.toLowerCase(),
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      roleId: role.id,
    });

    return this.userRepository.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    if (refreshToken) {
      const salt = await bcrypt.genSalt(12);
      const hashedToken = await bcrypt.hash(refreshToken, salt);
      await this.userRepository.update(userId, { refreshToken: hashedToken });
    } else {
      await this.userRepository.update(userId, { refreshToken: null });
    }
  }

  async validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user?.refreshToken) return false;
    return bcrypt.compare(refreshToken, user.refreshToken);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.update(userId, { lastLogin: new Date() });
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<{ data: User[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');

    if (options?.role) {
      query.andWhere('role.name = :role', { role: options.role });
    }

    if (options?.search) {
      query.andWhere(
        '(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search)',
        { search: `%${options.search}%` },
      );
    }

    const [data, total] = await query
      .skip(skip)
      .take(limit)
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();

    return { data, total };
  }

  async getRoleByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async ensureRolesExist(): Promise<void> {
    const roles = [
      { name: 'guest', description: 'Guest user with limited access' },
      { name: 'client', description: 'Registered client' },
      { name: 'coach', description: 'Fitness coach' },
      { name: 'nutritionist', description: 'Nutrition specialist' },
      { name: 'content_manager', description: 'Content management' },
      { name: 'store_manager', description: 'Store and product management' },
      { name: 'support_agent', description: 'Customer support' },
      { name: 'admin', description: 'Platform administrator' },
      { name: 'super_admin', description: 'Super administrator with full access' },
    ];

    for (const role of roles) {
      const existing = await this.roleRepository.findOne({ where: { name: role.name } });
      if (!existing) {
        await this.roleRepository.save(this.roleRepository.create(role));
      }
    }
  }
}
