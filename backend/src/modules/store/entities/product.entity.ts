import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  @Index()
  name: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ unique: true, length: 100 })
  sku: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100 })
  @Index()
  category: string;

  @Column({ name: 'price_usd', type: 'decimal', precision: 8, scale: 2 })
  priceUsd: number;

  @Column({ name: 'price_eur', type: 'decimal', precision: 8, scale: 2 })
  priceEur: number;

  @Column({ name: 'purity_grade', length: 100, default: 'WADA COMPLIANT' })
  purityGrade: string;

  @Column({ name: 'batch_number', length: 100 })
  batchNumber: string;

  @Column({ length: 255, nullable: true })
  spec: string;

  @Column({ name: 'stock_quantity', type: 'int', default: 100 })
  stockQuantity: number;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
