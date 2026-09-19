import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ExerciseCategory {
  COMPOUND = 'compound',
  ISOLATION = 'isolation',
  CARDIO = 'cardio',
  MOBILITY = 'mobility',
  OLYMPIC = 'olympic',
}

export enum ExerciseDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ELITE = 'elite',
}

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  @Index()
  name: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ExerciseCategory,
    default: ExerciseCategory.COMPOUND,
  })
  category: ExerciseCategory;

  @Column({ name: 'primary_muscle_group', length: 100 })
  @Index()
  primaryMuscleGroup: string;

  @Column({ name: 'secondary_muscles', type: 'simple-json', nullable: true })
  secondaryMuscles: string[];

  @Column({ length: 100, default: 'barbell' })
  equipment: string;

  @Column({ length: 50, default: 'compound' })
  mechanics: string;

  @Column({
    type: 'enum',
    enum: ExerciseDifficulty,
    default: ExerciseDifficulty.INTERMEDIATE,
  })
  difficulty: ExerciseDifficulty;

  @Column({ name: 'video_url', length: 500, nullable: true })
  videoUrl: string;

  @Column({ name: 'instructions', type: 'simple-json', nullable: true })
  instructions: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
