import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProgressService } from './progress.service';

@ApiTags('Progress')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('measurements')
  @ApiOperation({ summary: 'Get longitudinal body measurements and recovery metrics' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  async getMeasurements(@Request() req: any, @Query('limit') limit = '30') {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.progressService.getMeasurements(userId, parseInt(limit, 10));
    return {
      success: true,
      data,
      meta: { count: data.length },
    };
  }

  @Post('measurements')
  @ApiOperation({ summary: 'Log daily body weight, fat%, HRV, and sleep metrics' })
  async logMeasurement(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.progressService.logMeasurement(userId, body);
    return {
      success: true,
      message: 'Biometric telemetry saved successfully',
      data,
    };
  }

  @Get('biomarkers')
  @ApiOperation({ summary: 'Get clinical biomarker lab results and endocrine panels' })
  async getBiomarkers(@Request() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.progressService.getBiomarkers(userId);
    return {
      success: true,
      data,
    };
  }

  @Post('biomarkers')
  @ApiOperation({ summary: 'Log clinical biomarker report' })
  async logBiomarkers(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.progressService.logBiomarkers(userId, body);
    return {
      success: true,
      message: 'Biomarkers registered',
      data,
    };
  }
}
