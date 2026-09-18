import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodItem } from './entities/food-item.entity';
import { DietPlan } from './entities/diet-plan.entity';
import { NutritionLog } from './entities/nutrition-log.entity';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodItem, DietPlan, NutritionLog]),
  ],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
