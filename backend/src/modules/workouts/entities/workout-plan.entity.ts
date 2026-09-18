import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WorkoutDay } from './workout-day.entity';

@Entity('workout_plans')
export class WorkoutPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'coach_id', nullable: true })
  @Index()
  coachId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'coach_id' })
  coach: User;

  @Column({ name: 'client_id', nullable: true })
  @Index()
  clientId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column({ length: 100, default: 'Hypertrophy Phase 2' })
  phase: string;

  @Column({ name: 'mesocycle_weeks', type: 'int', default: 12 })
  mesocycleWeeks: number;

  @Column({ name: 'days_per_week', type: 'int', default: 4 })
  daysPerWeek: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @OneToMany(() => WorkoutDay, (day) => day.workoutPlan, { cascade: true })
  days: WorkoutDay[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
