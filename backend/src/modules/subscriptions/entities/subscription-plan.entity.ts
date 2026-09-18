import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SubscriptionTier {
  STARTER = 'starter',
  PRO = 'pro',
  ELITE_OLYMPIAN = 'elite_olympian',
  COACH_PACK = 'coach_pack',
}

@Entity('subscription_plans')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: SubscriptionTier,
    default: SubscriptionTier.PRO,
  })
  tier: SubscriptionTier;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceMonthly: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceAnnual: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json' })
  features: string[];

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
