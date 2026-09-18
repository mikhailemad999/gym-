import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodItem } from './entities/food-item.entity';
import { DietPlan } from './entities/diet-plan.entity';
import { NutritionLog, MealType } from './entities/nutrition-log.entity';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(FoodItem)
    private readonly foodItemRepo: Repository<FoodItem>,
    @InjectRepository(DietPlan)
    private readonly dietPlanRepo: Repository<DietPlan>,
    @InjectRepository(NutritionLog)
    private readonly nutritionLogRepo: Repository<NutritionLog>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultFoods();
  }

  private async seedDefaultFoods() {
    const count = await this.foodItemRepo.count();
    if (count > 0) return;

    const foods: Partial<FoodItem>[] = [
      { name: 'Organic Rolled Oats', servingSizeGrams: 80, calories: 300, proteinGrams: 10, carbsGrams: 54, fatGrams: 5, fiberGrams: 8 },
      { name: 'Liquid Egg Whites', servingSizeGrams: 200, calories: 100, proteinGrams: 22, carbsGrams: 2, fatGrams: 0, fiberGrams: 0 },
      { name: 'Fresh Blueberries', servingSizeGrams: 100, calories: 57, proteinGrams: 0.7, carbsGrams: 14, fatGrams: 0.3, fiberGrams: 2.4 },
      { name: 'Grass-Fed Whey Isolate', servingSizeGrams: 30, calories: 120, proteinGrams: 27, carbsGrams: 1, fatGrams: 0.5, fiberGrams: 0 },
      { name: 'Wild Atlantic Salmon Fillet', servingSizeGrams: 200, calories: 416, proteinGrams: 40, carbsGrams: 0, fatGrams: 26, fiberGrams: 0 },
      { name: 'Steamed Jasmine Rice', servingSizeGrams: 200, calories: 260, proteinGrams: 5, carbsGrams: 56, fatGrams: 0.8, fiberGrams: 1 },
      { name: 'Grilled Asparagus Spears', servingSizeGrams: 150, calories: 30, proteinGrams: 3, carbsGrams: 5.8, fatGrams: 0.2, fiberGrams: 3.2 },
      { name: 'Extra Virgin Cold-Pressed Olive Oil', servingSizeGrams: 15, calories: 120, proteinGrams: 0, carbsGrams: 0, fatGrams: 14, fiberGrams: 0 },
      { name: 'Charred Chicken Breast Tenderloins', servingSizeGrams: 220, calories: 360, proteinGrams: 68, carbsGrams: 0, fatGrams: 7, fiberGrams: 0 },
      { name: 'Roasted Japanese Sweet Potato', servingSizeGrams: 250, calories: 215, proteinGrams: 4, carbsGrams: 50, fatGrams: 0.4, fiberGrams: 7.5 },
    ];

    for (const f of foods) {
      await this.foodItemRepo.save(this.foodItemRepo.create(f));
    }
  }

  async getFoods(): Promise<FoodItem[]> {
    return this.foodItemRepo.find({ order: { name: 'ASC' } });
  }

  async getActiveDietPlan(userId: string): Promise<DietPlan> {
    const plan = await this.dietPlanRepo.findOne({
      where: [{ clientId: userId, isActive: true }, { isActive: true }],
    });
    if (plan) return plan;

    return this.dietPlanRepo.create({
      clientId: userId,
      title: 'High-Performance Body Recomposition',
      targetCalories: 2340,
      targetProteinGrams: 190,
      targetCarbsGrams: 240,
      targetFatGrams: 65,
      targetWaterMl: 3500,
      isActive: true,
    });
  }

  async getDailyLogs(userId: string, date: string): Promise<{ logs: NutritionLog[]; totals: any }> {
    const logs = await this.nutritionLogRepo.find({
      where: { userId, date },
      order: { createdAt: 'ASC' },
    });

    const totals = logs.reduce(
      (acc, curr) => ({
        calories: acc.calories + Number(curr.calories || 0),
        proteinGrams: acc.proteinGrams + Number(curr.proteinGrams || 0),
        carbsGrams: acc.carbsGrams + Number(curr.carbsGrams || 0),
        fatGrams: acc.fatGrams + Number(curr.fatGrams || 0),
      }),
      { calories: 0, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 },
    );

    return { logs, totals };
  }

  async logMeal(userId: string, payload: Partial<NutritionLog>): Promise<NutritionLog> {
    const entry = this.nutritionLogRepo.create({
      ...payload,
      userId,
    });
    return this.nutritionLogRepo.save(entry);
  }
}
