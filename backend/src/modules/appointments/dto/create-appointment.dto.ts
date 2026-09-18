import { IsString, IsNotEmpty, IsEnum, IsDateString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentType } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'ID of assigned coach' })
  @IsString()
  @IsNotEmpty()
  coachId: string;

  @ApiProperty({ enum: AppointmentType })
  @IsEnum(AppointmentType)
  type: AppointmentType;

  @ApiProperty({ description: 'Scheduled ISO date timestamp' })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional({ description: 'Duration in minutes', default: 45 })
  @IsOptional()
  @IsInt()
  @Min(15)
  durationMinutes?: number;

  @ApiPropertyOptional({ description: 'Specific objectives or notes for the session' })
  @IsOptional()
  @IsString()
  notes?: string;
}
