import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './modules/agent/agent.module';
import { StreamingModule } from './modules/streaming/streaming.module';

@Module({
  imports: [ConfigModule.forRoot(), StreamingModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
