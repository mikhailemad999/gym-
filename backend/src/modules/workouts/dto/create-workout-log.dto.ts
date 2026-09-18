import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoggedSetDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  setNumber: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  weightKg: number;

  @ApiProperty({ example: 8 })
  @IsNumber()
  targetReps: number;

  @ApiProperty({ example: 8 })
  @IsNumber()
  repsCompleted: number;

  @ApiProperty({ example: 8.5 })
  @IsNumber()
  rpe: number;

  @ApiProperty({ example: true })
  completed: boolean;
}

export class ExerciseLogItemDto {
  @ApiProperty({ example: 'uuid-here' })
  @IsString()
  exerciseId: string;

  @ApiProperty({ example: 'Incline Barbell Bench Press' })
  @IsString()
  exerciseName: string;

  @ApiProperty({ type: [LoggedSetDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoggedSetDto)
  sets: LoggedSetDto[];
}

export class CreateWorkoutLogDto {
  @ApiPropertyOptional({ example: 'Push Session A - Heavy Mechanical Tension' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'uuid-plan' })
  @IsOptional()
  @IsString()
  workoutPlanId?: string;

  @ApiPropertyOptional({ example: 'uuid-day' })
  @IsOptional()
  @IsString()
  workoutDayId?: string;

  @ApiProperty({ example: '2026-09-18T10:00:00Z' })
  @IsDateString()
  startedAt: string;

  @ApiPropertyOptional({ example: '2026-09-18T11:15:00Z' })
  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @ApiPropertyOptional({ example: 4500 })
  @IsOptional()
  @IsNumber()
  durationSeconds?: number;

  @ApiPropertyOptional({ example: 485 })
  @IsOptional()
  @IsNumber()
  caloriesBurned?: number;

  @ApiPropertyOptional({ example: 12450.5 })
  @IsOptional()
  @IsNumber()
  totalVolumeKg?: number;

  @ApiPropertyOptional({ example: 8.5 })
  @IsOptional()
  @IsNumber()
  averageRpe?: number;

  @ApiPropertyOptional({ example: 'Great session, PR on Incline Bench.' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: [ExerciseLogItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseLogItemDto)
  exercisesData?: ExerciseLogItemDto[];
}
