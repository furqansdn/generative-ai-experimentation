import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { StreamingModule } from './modules/streaming/streaming.module';
import { AgentModule } from './modules/agent/agent.module';

@Module({
  imports: [ConfigModule.forRoot(), StreamingModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
