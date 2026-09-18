import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(clientId: string, dto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create({
      ...dto,
      clientId,
      scheduledAt: new Date(dto.scheduledAt),
      status: AppointmentStatus.CONFIRMED,
      meetUrl: `https://meet.athletecare.pro/session-${Math.random().toString(36).substring(2, 9)}`,
    });
    return this.appointmentRepository.save(appointment);
  }

  async findByClient(clientId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { clientId },
      order: { scheduledAt: 'ASC' },
      relations: { coach: true },
    });
  }

  async findByCoach(coachId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { coachId },
      order: { scheduledAt: 'ASC' },
      relations: { client: true },
    });
  }

  async cancel(id: string, userId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.clientId !== userId && appointment.coachId !== userId) {
      throw new NotFoundException('Appointment not found for user');
    }
    appointment.status = AppointmentStatus.CANCELLED;
    return this.appointmentRepository.save(appointment);
  }
}
