import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessagingService } from './messaging.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Messaging')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('threads')
  @ApiOperation({ summary: 'Get current user message threads' })
  getUserThreads(@Request() req: any) {
    return this.messagingService.getUserThreads(req.user.id);
  }

  @Get('threads/:threadId')
  @ApiOperation({ summary: 'Get message history for a specific thread' })
  getThreadMessages(@Param('threadId') threadId: string) {
    return this.messagingService.getThreadMessages(threadId);
  }

  @Post('threads/:threadId')
  @ApiOperation({ summary: 'Send a message or telemetry payload in thread' })
  sendMessage(
    @Request() req: any,
    @Param('threadId') threadId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.messagingService.sendMessage(threadId, req.user.id, dto);
  }
}
