import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Ensure roles exist on startup
    await this.usersService.ensureRolesExist();

    // Create default admin if not exists
    const adminEmail = 'admin@athletecare.pro';
    const existing = await this.usersService.findByEmail(adminEmail);
    if (!existing) {
      try {
        await this.usersService.create({
          email: adminEmail,
          password: 'CHANGE_ME_BEFORE_PRODUCTION',
          firstName: 'Admin',
          lastName: 'User',
          roleName: 'super_admin',
        });
        console.log('✅ Default admin created: admin@athletecare.pro');
      } catch (error) {
        console.log('ℹ️ Admin user already exists');
      }
    }

    // Create default athlete client
    const athleteEmail = 'mikhail@athletecare.pro';
    const existingAthlete = await this.usersService.findByEmail(athleteEmail);
    if (!existingAthlete) {
      try {
        await this.usersService.create({
          email: athleteEmail,
          password: 'ProAthlete2026!',
          firstName: 'Mikhail',
          lastName: 'R.',
          roleName: 'client',
        });
        console.log('✅ Default athlete created: mikhail@athletecare.pro');
      } catch (error) {
        console.log('ℹ️ Athlete user already exists');
      }
    }

    // Create default coach
    const coachEmail = 'coach@athletecare.pro';
    const existingCoach = await this.usersService.findByEmail(coachEmail);
    if (!existingCoach) {
      try {
        await this.usersService.create({
          email: coachEmail,
          password: 'ProCoach2026!',
          firstName: 'Marcus',
          lastName: 'Vance',
          roleName: 'coach',
        });
        console.log('✅ Default coach created: coach@athletecare.pro');
      } catch (error) {
        console.log('ℹ️ Coach user already exists');
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isValid = await this.usersService.validatePassword(user, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name || 'client',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
    });

    // Store hashed refresh token
    await this.usersService.updateRefreshToken(user.id, refreshToken);
    await this.usersService.updateLastLogin(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.profilePhoto,
        role: user.role?.name,
        isVerified: user.isVerified,
        isActive: user.isActive,
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: 900, // 15 minutes in seconds
      },
    };
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: string;
  }) {
    const user = await this.usersService.create({
      ...data,
      roleName: 'client',
    });

    // Reload with role relation
    const fullUser = await this.usersService.findById(user.id);
    if (!fullUser) {
      throw new Error('User creation failed');
    }

    return this.login(fullUser);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const isValid = await this.usersService.validateRefreshToken(userId, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or deactivated');
    }

    return this.login(user);
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
