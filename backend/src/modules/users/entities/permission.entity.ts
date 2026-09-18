import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  code: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100, nullable: true })
  module: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
