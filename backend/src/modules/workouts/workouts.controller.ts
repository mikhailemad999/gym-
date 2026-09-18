import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { ExerciseCategory } from './entities/exercise.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('exercises')
  @ApiOperation({ summary: 'Get all exercise library items with optional filters' })
  @ApiQuery({ name: 'category', enum: ExerciseCategory, required: false })
  @ApiQuery({ name: 'muscle', type: String, required: false })
  @ApiResponse({ status: 200, description: 'List of exercises returned successfully' })
  async getExercises(
    @Query('category') category?: ExerciseCategory,
    @Query('muscle') muscle?: string,
  ) {
    const data = await this.workoutsService.getAllExercises(category, muscle);
    return {
      success: true,
      data,
      meta: { count: data.length, timestamp: new Date().toISOString() },
    };
  }

  @Get('exercises/:id')
  @ApiOperation({ summary: 'Get exercise by ID' })
  @ApiResponse({ status: 200, description: 'Exercise details' })
  async getExerciseById(@Param('id') id: string) {
    const data = await this.workoutsService.getExerciseById(id);
    return {
      success: true,
      data,
    };
  }

  @Get('plan/active')
  @ApiOperation({ summary: 'Get active workout plan for current user or default' })
  async getActivePlan(@Request() req: any) {
    const userId = req.user?.id || 'demo-user';
    const data = await this.workoutsService.getActivePlanForUser(userId);
    return {
      success: true,
      data,
    };
  }

  @Post('logs')
  @ApiOperation({ summary: 'Log a completed workout session with set data and volume' })
  @ApiResponse({ status: 201, description: 'Workout logged successfully' })
  async logWorkout(@Request() req: any, @Body() dto: CreateWorkoutLogDto) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.workoutsService.logWorkout(userId, dto);
    return {
      success: true,
      message: 'Workout logged successfully',
      data,
    };
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get recent workout history logs' })
  async getLogs(@Request() req: any, @Query('limit') limit = '10') {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.workoutsService.getWorkoutLogs(userId, parseInt(limit, 10));
    return {
      success: true,
      data,
      meta: { count: data.length },
    };
  }

  @Get('volume-stats')
  @ApiOperation({ summary: 'Get aggregate volume and load statistics' })
  async getVolumeStats(@Request() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.workoutsService.getVolumeStats(userId);
    return {
      success: true,
      data,
    };
  }
}
