import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  @Index()
  name: string;

  @Column({ length: 100, nullable: true })
  brand: string;

  @Column({ name: 'serving_size_grams', type: 'decimal', precision: 8, scale: 2, default: 100 })
  servingSizeGrams: number;

  @Column({ type: 'int' })
  calories: number;

  @Column({ name: 'protein_grams', type: 'decimal', precision: 6, scale: 2 })
  proteinGrams: number;

  @Column({ name: 'carbs_grams', type: 'decimal', precision: 6, scale: 2 })
  carbsGrams: number;

  @Column({ name: 'fat_grams', type: 'decimal', precision: 6, scale: 2 })
  fatGrams: number;

  @Column({ name: 'fiber_grams', type: 'decimal', precision: 6, scale: 2, default: 0 })
  fiberGrams: number;

  @Column({ type: 'simple-json', nullable: true })
  micronutrients: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
