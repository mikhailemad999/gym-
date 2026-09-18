import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService, AiPromptRequest } from './ai.service';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('query')
  @ApiOperation({ summary: 'Submit query to AI Performance Coach with bio-telemetry context' })
  async query(@Body() body: AiPromptRequest) {
    const data = await this.aiService.generateResponse(body);
    return {
      success: true,
      data,
    };
  }
}
