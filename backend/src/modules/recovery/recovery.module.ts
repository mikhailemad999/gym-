import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryLog } from './entities/recovery-log.entity';
import { HydrationLog } from './entities/hydration-log.entity';
import { User } from '../users/entities/user.entity';
import { RecoveryService } from './recovery.service';
import { RecoveryController } from './recovery.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecoveryLog, HydrationLog, User])],
  controllers: [RecoveryController],
  providers: [RecoveryService],
  exports: [RecoveryService],
})
export class RecoveryModule {}
