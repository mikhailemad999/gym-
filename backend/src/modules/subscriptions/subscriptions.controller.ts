import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'List all active subscription plans' })
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  @Get('my')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user active subscription' })
  getUserSubscription(@Request() req: any) {
    return this.subscriptionsService.getUserSubscription(req.user.id);
  }

  @Post('subscribe')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Subscribe or upgrade tier' })
  subscribe(@Request() req: any, @Body() dto: SubscribeDto) {
    return this.subscriptionsService.subscribe(req.user.id, dto);
  }

  @Post('cancel')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cancel current subscription at period end' })
  cancel(@Request() req: any) {
    return this.subscriptionsService.cancel(req.user.id);
  }
}
