import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
