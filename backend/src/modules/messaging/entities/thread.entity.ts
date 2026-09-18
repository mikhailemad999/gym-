import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';

@Entity('message_threads')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'athlete_id' })
  athleteId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'athlete_id' })
  athlete: User;

  @Column({ name: 'coach_id' })
  coachId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coach_id' })
  coach: User;

  @Column({ default: 'Direct Telemetry Channel' })
  title: string;

  @OneToMany(() => Message, (message) => message.thread)
  messages: Message[];

  @Column({ type: 'timestamp', nullable: true, name: 'last_message_at' })
  lastMessageAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
