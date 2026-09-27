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

export interface HydrationEntry {
  id: string;
  timestamp: string;
  amountMl: number;
  beverage: string;
}

@Entity('hydration_logs')
export class HydrationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'log_date', type: 'date' })
  @Index()
  logDate: string;

  @Column({ name: 'total_intake_ml', type: 'int', default: 0 })
  totalIntakeMl: number;

  @Column({ name: 'target_ml', type: 'int', default: 3500 })
  targetMl: number;

  @Column({ name: 'entries', type: 'simple-json', nullable: true })
  entries: HydrationEntry[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
