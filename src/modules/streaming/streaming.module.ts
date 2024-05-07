import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';

@Module({
  providers: [StreamingService],
  controllers: [StreamingController],
})
export class StreamingModule {}
