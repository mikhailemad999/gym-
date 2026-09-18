import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('body_measurements')
export class BodyMeasurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date' })
  @Index()
  date: string;

  @Column({ name: 'body_weight_kg', type: 'decimal', precision: 5, scale: 2 })
  bodyWeightKg: number;

  @Column({ name: 'body_fat_percentage', type: 'decimal', precision: 4, scale: 1, nullable: true })
  bodyFatPercentage: number;

  @Column({ name: 'muscle_mass_kg', type: 'decimal', precision: 5, scale: 2, nullable: true })
  muscleMassKg: number;

  @Column({ name: 'resting_heart_rate_bpm', type: 'int', nullable: true })
  restingHeartRateBpm: number;

  @Column({ name: 'hrv_ms', type: 'int', nullable: true })
  hrvMs: number;

  @Column({ name: 'sleep_hours', type: 'decimal', precision: 3, scale: 1, nullable: true })
  sleepHours: number;

  @Column({ name: 'sleep_score', type: 'int', nullable: true })
  sleepScore: number;

  @Column({ name: 'chest_cm', type: 'decimal', precision: 5, scale: 2, nullable: true })
  chestCm: number;

  @Column({ name: 'waist_cm', type: 'decimal', precision: 5, scale: 2, nullable: true })
  waistCm: number;

  @Column({ name: 'arms_cm', type: 'decimal', precision: 5, scale: 2, nullable: true })
  armsCm: number;

  @Column({ name: 'thighs_cm', type: 'decimal', precision: 5, scale: 2, nullable: true })
  thighsCm: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
