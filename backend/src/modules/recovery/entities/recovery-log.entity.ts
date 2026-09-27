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

export type ReadinessState = 'OPTIMAL' | 'GOOD' | 'STRAINED' | 'CRITICAL';

@Entity('recovery_logs')
export class RecoveryLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'log_date', type: 'date' })
  @Index()
  logDate: string;

  @Column({ name: 'sleep_hours', type: 'decimal', precision: 4, scale: 2, default: 7.5 })
  sleepHours: number;

  @Column({ name: 'sleep_quality', type: 'int', default: 85 })
  sleepQuality: number; // 1-100

  @Column({ name: 'resting_heart_rate', type: 'int', default: 54 })
  restingHeartRate: number; // bpm

  @Column({ name: 'hrv_rmssd', type: 'int', default: 65 })
  hrvRmssd: number; // ms

  @Column({ name: 'soreness_score', type: 'int', default: 3 })
  sorenessScore: number; // 1-10

  @Column({ name: 'stress_score', type: 'int', default: 3 })
  stressScore: number; // 1-10

  @Column({ name: 'energy_score', type: 'int', default: 8 })
  energyScore: number; // 1-10

  @Column({ name: 'readiness_score', type: 'int', default: 88 })
  readinessScore: number; // 1-100

  @Column({
    name: 'readiness_state',
    type: 'varchar',
    length: 50,
    default: 'OPTIMAL',
  })
  readinessState: ReadinessState;

  @Column({ name: 'sore_muscles', type: 'simple-json', nullable: true })
  soreMuscles: string[];

  @Column({ name: 'ai_insight', type: 'text', nullable: true })
  aiInsight: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
