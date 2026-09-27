import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RecoveryService } from './recovery.service';
import { LogRecoveryDto } from './dto/log-recovery.dto';
import { LogHydrationDto } from './dto/log-hydration.dto';

@ApiTags('Recovery & Telemetry')
@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

  @Get('daily')
  @ApiOperation({ summary: 'Get current day autonomic readiness, HRV, and sleep metrics' })
  @ApiQuery({ name: 'date', type: String, required: false })
  async getDailyRecovery(@Request() req: any, @Query('date') date?: string) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.recoveryService.getDailyRecovery(userId, date);
    return {
      success: true,
      data,
    };
  }

  @Post('daily')
  @ApiOperation({ summary: 'Log sleep, HRV, resting heart rate, soreness, and compute readiness' })
  @ApiResponse({ status: 201, description: 'Recovery metrics logged and readiness calculated' })
  async logDailyRecovery(@Request() req: any, @Body() body: LogRecoveryDto) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.recoveryService.logDailyRecovery(userId, body);
    return {
      success: true,
      message: 'Recovery biometrics logged successfully',
      data,
    };
  }

  @Get('trends')
  @ApiOperation({ summary: 'Get 7-day to 14-day longitudinal recovery and HRV trend curves' })
  @ApiQuery({ name: 'days', type: Number, required: false })
  async getRecoveryTrends(@Request() req: any, @Query('days') days = '7') {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.recoveryService.getRecoveryTrends(userId, parseInt(days, 10));
    return {
      success: true,
      data,
    };
  }

  @Get('hydration')
  @ApiOperation({ summary: 'Get today hydration progress, target, and beverage timeline' })
  async getTodayHydration(@Request() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.recoveryService.getTodayHydration(userId);
    return {
      success: true,
      data,
    };
  }

  @Post('hydration')
  @ApiOperation({ summary: 'Log fluid or water intake' })
  @ApiResponse({ status: 201, description: 'Hydration logged successfully' })
  async logHydration(@Request() req: any, @Body() body: LogHydrationDto) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.recoveryService.logHydration(userId, body);
    return {
      success: true,
      message: 'Hydration recorded',
      data,
    };
  }
}
