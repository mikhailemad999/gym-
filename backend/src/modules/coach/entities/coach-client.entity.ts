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

@Entity('coach_clients')
export class CoachClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'coach_id' })
  @Index()
  coachId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'coach_id' })
  coach: User;

  @Column({ name: 'client_id' })
  @Index()
  clientId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column({ length: 100, default: 'Tier 1 Pro' })
  tier: string;

  @Column({ length: 100, default: 'Strength & Conditioning' })
  discipline: string;

  @Column({ name: 'current_phase', length: 100, default: 'Hypertrophy Phase 2' })
  currentPhase: string;

  @Column({ length: 100, default: 'Week 09 / Day 03' })
  microcycle: string;

  @Column({ name: 'adherence_score', type: 'decimal', precision: 5, scale: 2, default: 94.0 })
  adherenceScore: number;

  @Column({ name: 'cns_status', length: 100, default: 'OPTIMAL (1.04)' })
  cnsStatus: string;

  @Column({ name: 'cns_ratio', type: 'decimal', precision: 4, scale: 2, default: 1.04 })
  cnsRatio: number;

  @Column({ name: 'needs_review', default: false })
  needsReview: boolean;

  @Column({ name: 'last_telemetry', length: 100, nullable: true })
  lastTelemetry: string;

  @Column({ name: 'last_telemetry_detail', length: 255, nullable: true })
  lastTelemetryDetail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
