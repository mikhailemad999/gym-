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

@Entity('diet_plans')
export class DietPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'client_id' })
  @Index()
  clientId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column({ name: 'coach_id', nullable: true })
  coachId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'coach_id' })
  coach: User;

  @Column({ name: 'target_calories', type: 'int', default: 2340 })
  targetCalories: number;

  @Column({ name: 'target_protein_grams', type: 'decimal', precision: 6, scale: 2, default: 190 })
  targetProteinGrams: number;

  @Column({ name: 'target_carbs_grams', type: 'decimal', precision: 6, scale: 2, default: 240 })
  targetCarbsGrams: number;

  @Column({ name: 'target_fat_grams', type: 'decimal', precision: 6, scale: 2, default: 65 })
  targetFatGrams: number;

  @Column({ name: 'target_water_ml', type: 'int', default: 3500 })
  targetWaterMl: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
