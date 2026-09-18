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

export interface LoggedSet {
  setNumber: number;
  weightKg: number;
  targetReps: number;
  repsCompleted: number;
  rpe: number;
  completed: boolean;
}

export interface ExerciseLogItem {
  exerciseId: string;
  exerciseName: string;
  sets: LoggedSet[];
}

@Entity('workout_logs')
export class WorkoutLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'workout_plan_id', nullable: true })
  @Index()
  workoutPlanId: string;

  @Column({ name: 'workout_day_id', nullable: true })
  workoutDayId: string;

  @Column({ length: 255, default: 'Push Session A - Heavy Mechanical Tension' })
  title: string;

  @Column({ name: 'started_at', type: 'datetime' })
  startedAt: Date;

  @Column({ name: 'completed_at', type: 'datetime', nullable: true })
  completedAt: Date;

  @Column({ name: 'duration_seconds', type: 'int', default: 0 })
  durationSeconds: number;

  @Column({ name: 'calories_burned', type: 'int', default: 0 })
  caloriesBurned: number;

  @Column({ name: 'total_volume_kg', type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalVolumeKg: number;

  @Column({ name: 'average_rpe', type: 'decimal', precision: 3, scale: 1, default: 0 })
  averageRpe: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'exercises_data', type: 'simple-json', nullable: true })
  exercisesData: ExerciseLogItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
