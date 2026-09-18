import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { NutritionService } from './nutrition.service';

@ApiTags('Nutrition')
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Get('foods')
  @ApiOperation({ summary: 'List all verified foods in dispensary database' })
  async getFoods() {
    const data = await this.nutritionService.getFoods();
    return {
      success: true,
      data,
      meta: { count: data.length },
    };
  }

  @Get('plan')
  @ApiOperation({ summary: 'Get current active macro and energetic targets' })
  async getDietPlan(@Request() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.nutritionService.getActiveDietPlan(userId);
    return {
      success: true,
      data,
    };
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get daily nutrition logs and totals for specific date' })
  @ApiQuery({ name: 'date', type: String, required: false, example: '2026-09-18' })
  async getDailyLogs(@Request() req: any, @Query('date') date?: string) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const targetDate = date || new Date().toISOString().split('T')[0];
    const data = await this.nutritionService.getDailyLogs(userId, targetDate);
    return {
      success: true,
      data,
      meta: { date: targetDate },
    };
  }

  @Post('logs')
  @ApiOperation({ summary: 'Log a meal event with foods and macros' })
  async logMeal(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.nutritionService.logMeal(userId, body);
    return {
      success: true,
      message: 'Meal logged successfully',
      data,
    };
  }
}
