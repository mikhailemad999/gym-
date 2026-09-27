import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogRecoveryDto {
  @ApiPropertyOptional({ example: '2026-09-27', description: 'Log date in YYYY-MM-DD' })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiProperty({ example: 7.8, description: 'Total sleep duration in hours' })
  @IsNumber()
  @Min(0)
  @Max(24)
  sleepHours: number;

  @ApiProperty({ example: 88, description: 'Sleep quality score (1-100)' })
  @IsNumber()
  @Min(1)
  @Max(100)
  sleepQuality: number;

  @ApiProperty({ example: 52, description: 'Resting heart rate in beats per minute' })
  @IsNumber()
  @Min(30)
  @Max(200)
  restingHeartRate: number;

  @ApiProperty({ example: 68, description: 'HRV RMSSD in milliseconds' })
  @IsNumber()
  @Min(5)
  @Max(250)
  hrvRmssd: number;

  @ApiProperty({ example: 3, description: 'Subjective muscle soreness (1-10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  sorenessScore: number;

  @ApiProperty({ example: 2, description: 'Perceived stress level (1-10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  stressScore: number;

  @ApiProperty({ example: 8, description: 'Subjective energy level (1-10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  energyScore: number;

  @ApiPropertyOptional({ example: ['chest', 'front_delts'], description: 'Muscle groups with noticeable soreness' })
  @IsOptional()
  @IsArray()
  soreMuscles?: string[];

  @ApiPropertyOptional({ example: 'Felt deep restorative sleep after magnesium supplement' })
  @IsOptional()
  @IsString()
  notes?: string;
}
