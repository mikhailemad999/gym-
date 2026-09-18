import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachClient } from './entities/coach-client.entity';
import { InterventionLog } from './entities/intervention-log.entity';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachClient, InterventionLog]),
  ],
  controllers: [CoachController],
  providers: [CoachService],
  exports: [CoachService],
})
export class CoachModule {}
