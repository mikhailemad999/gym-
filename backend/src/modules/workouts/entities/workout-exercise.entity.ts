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
import { WorkoutDay } from './workout-day.entity';
import { Exercise } from './exercise.entity';

@Entity('workout_exercises')
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'workout_day_id' })
  @Index()
  workoutDayId: string;

  @ManyToOne(() => WorkoutDay, (day) => day.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_day_id' })
  workoutDay: WorkoutDay;

  @Column({ name: 'exercise_id' })
  @Index()
  exerciseId: string;

  @ManyToOne(() => Exercise, { eager: true })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ name: 'order_index', type: 'int', default: 0 })
  orderIndex: number;

  @Column({ name: 'target_sets', type: 'int', default: 4 })
  targetSets: number;

  @Column({ name: 'target_reps_min', type: 'int', default: 8 })
  targetRepsMin: number;

  @Column({ name: 'target_reps_max', type: 'int', default: 10 })
  targetRepsMax: number;

  @Column({ name: 'target_rpe', type: 'decimal', precision: 3, scale: 1, default: 8.5 })
  targetRpe: number;

  @Column({ length: 20, default: '3-1-1-0' })
  tempo: string;

  @Column({ name: 'rest_seconds', type: 'int', default: 120 })
  restSeconds: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
