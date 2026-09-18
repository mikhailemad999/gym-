import {
  Controller,
  Get,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CoachService } from './coach.service';

@ApiTags('Coaches')
@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Get('roster')
  @ApiOperation({ summary: 'Get coach athlete roster with bio-telemetry & compliance' })
  async getRoster() {
    const data = await this.coachService.getRoster();
    return {
      success: true,
      data,
      meta: { total: data.length },
    };
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Get coach command center KPI matrix' })
  async getMetrics() {
    const data = await this.coachService.getKpiMetrics();
    return {
      success: true,
      data,
    };
  }

  @Post('intervene')
  @ApiOperation({ summary: 'Record tactical bio-programming or recovery intervention' })
  async recordIntervention(@Request() req: any, @Body() body: any) {
    const coachId = req.user?.id || '00000000-0000-0000-0000-000000000001';
    const data = await this.coachService.recordIntervention(
      coachId,
      body.clientId,
      body.actionType,
      body.summary,
    );
    return {
      success: true,
      message: 'Intervention registered and synced to athlete telemetry queue',
      data,
    };
  }
}
