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

export interface BiomarkerItem {
  name: string;
  category: string;
  value: number | string;
  unit: string;
  referenceMin?: number;
  referenceMax?: number;
  status: 'optimal' | 'warning' | 'critical';
}

@Entity('biomarker_logs')
export class BiomarkerLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'test_date', type: 'date' })
  @Index()
  testDate: string;

  @Column({ name: 'test_name', length: 255 })
  testName: string;

  @Column({ name: 'lab_provider', length: 255, nullable: true })
  labProvider: string;

  @Column({ type: 'simple-json' })
  markers: BiomarkerItem[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
