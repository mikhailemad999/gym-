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

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  PRE_WORKOUT = 'pre_workout',
  POST_WORKOUT = 'post_workout',
  SNACK = 'snack',
}

export interface MealItem {
  name: string;
  portion: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

@Entity('nutrition_logs')
export class NutritionLog {
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

  @Column({
    name: 'meal_type',
    type: 'enum',
    enum: MealType,
    default: MealType.BREAKFAST,
  })
  mealType: MealType;

  @Column({ name: 'meal_title', length: 255 })
  mealTitle: string;

  @Column({ type: 'int', default: 0 })
  calories: number;

  @Column({ name: 'protein_grams', type: 'decimal', precision: 6, scale: 2, default: 0 })
  proteinGrams: number;

  @Column({ name: 'carbs_grams', type: 'decimal', precision: 6, scale: 2, default: 0 })
  carbsGrams: number;

  @Column({ name: 'fat_grams', type: 'decimal', precision: 6, scale: 2, default: 0 })
  fatGrams: number;

  @Column({ name: 'items_data', type: 'simple-json', nullable: true })
  itemsData: MealItem[];

  @Column({ length: 50, default: 'Logged' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
