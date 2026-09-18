import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultProducts();
  }

  private async seedDefaultProducts() {
    const count = await this.productRepo.count();
    if (count > 0) return;

    const products: Partial<Product>[] = [
      {
        name: 'Hydrolyzed Native Whey Isolate',
        slug: 'hydrolyzed-native-whey-isolate',
        sku: 'WH-ISO-900',
        description: 'Micro-filtered cross-flow native whey isolate with rapid leucine absorption curve and 0% lactose.',
        category: 'Ergogenics',
        priceUsd: 74.0,
        priceEur: 68.0,
        purityGrade: '99.4% Protein Yield',
        batchNumber: 'BATCH: #W98-2026',
        spec: 'Servings: 30 // Leucine: 3.1g',
        stockQuantity: 150,
      },
      {
        name: 'Creapure® Creatine Monohydrate',
        slug: 'creapure-creatine-monohydrate',
        sku: 'CR-MONO-500',
        description: 'German manufactured patented micronized creatine monohydrate for maximal ATP cellular re-phosphorylation.',
        category: 'Ergogenics',
        priceUsd: 42.0,
        priceEur: 38.0,
        purityGrade: '99.9% Ultrapure',
        batchNumber: 'BATCH: #CR-4412',
        spec: 'Weight: 500g // Mesh: 200',
        stockQuantity: 200,
      },
      {
        name: 'Clinical Electrolyte Hydration Matrix',
        slug: 'clinical-electrolyte-hydration-matrix',
        sku: 'EL-HYD-060',
        description: 'Bio-equivalent osmolar sodium, potassium citrate, and magnesium glycinate balance for intra-workout neural signaling.',
        category: 'Micro-Nutrition',
        priceUsd: 38.0,
        priceEur: 35.0,
        purityGrade: 'USP Grade Mineral Salts',
        batchNumber: 'BATCH: #EL-8902',
        spec: 'Sodium: 1000mg // Potassium: 200mg',
        stockQuantity: 180,
      },
      {
        name: 'Ultra-Pure Omega-3 Triglycerides',
        slug: 'ultra-pure-omega-3-triglycerides',
        sku: 'OM-3TG-120',
        description: 'Wild Alaskan fish oil re-esterified triglycerides with 800mg EPA and 400mg DHA per softgel for systemic anti-inflammation.',
        category: 'Bio-Lipids',
        priceUsd: 48.0,
        priceEur: 44.0,
        purityGrade: 'IFOS 5-Star Certified',
        batchNumber: 'BATCH: #OM-1109',
        spec: '120 Enteric Softgels // EPA 800mg',
        stockQuantity: 95,
      },
      {
        name: 'Sleep Architecture & Magnesium Bisglycinate',
        slug: 'sleep-architecture-magnesium-bisglycinate',
        sku: 'MG-SLP-090',
        description: 'Chelated magnesium bisglycinate with L-theanine and apigenin for enhanced deep delta sleep waves and nocturnal parasympathetic tone.',
        category: 'Endocrine Support',
        priceUsd: 36.0,
        priceEur: 33.0,
        purityGrade: 'Albion TRAACS® Certified',
        batchNumber: 'BATCH: #SL-7721',
        spec: '90 Vegetarian Capsules',
        stockQuantity: 110,
      },
      {
        name: 'Precision Bar Velocity Encoder',
        slug: 'precision-bar-velocity-encoder',
        sku: 'HW-VBT-001',
        description: 'Wireless linear transducer for measuring concentric barbell velocity, mean propulsive velocity, and power output in real-time.',
        category: 'Biomechanics Hardware',
        priceUsd: 289.0,
        priceEur: 265.0,
        purityGrade: 'ISO 9001 Calibrated Hardware',
        batchNumber: 'SERIAL: #AC-BT-0994',
        spec: 'Bluetooth 5.3 // 1000Hz Optical Sensor',
        stockQuantity: 25,
      },
    ];

    for (const p of products) {
      await this.productRepo.save(this.productRepo.create(p));
    }
  }

  async getAllProducts(category?: string): Promise<Product[]> {
    const qb = this.productRepo.createQueryBuilder('product');
    if (category && category !== 'All Formulations') {
      qb.where('product.category = :category', { category });
    }
    return qb.orderBy('product.name', 'ASC').getMany();
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug } });
    if (!product) {
      throw new NotFoundException(`Product ${slug} not found`);
    }
    return product;
  }

  async createOrder(userId: string, payload: { items: any[]; totalAmount: number; currency: string; shippingAddress?: any }): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const order = this.orderRepo.create({
      userId,
      orderNumber,
      totalAmount: payload.totalAmount,
      currency: payload.currency || 'USD',
      status: OrderStatus.PROCESSING,
      items: payload.items,
      shippingAddress: payload.shippingAddress || {},
    });
    return this.orderRepo.save(order);
  }

  async getOrders(userId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
