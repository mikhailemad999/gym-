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
import { WorkoutPlan } from './workout-plan.entity';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity('workout_days')
export class WorkoutDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'workout_plan_id' })
  @Index()
  workoutPlanId: string;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.days, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workout_plan_id' })
  workoutPlan: WorkoutPlan;

  @Column({ name: 'day_number', type: 'int' })
  dayNumber: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => WorkoutExercise, (we) => we.workoutDay, { cascade: true })
  exercises: WorkoutExercise[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
