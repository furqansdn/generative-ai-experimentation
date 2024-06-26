import { Module } from '@nestjs/common';
import { ContextStorageModule } from 'common/utils/context-storage/context-storage.module';
import { LoggerModule } from 'common/utils/logger/logger.module';
import { SharedModule } from 'shared/shared.module';

import { AgentModule } from './modules/agent/agent.module';
import { StreamingModule } from './modules/streaming/streaming.module';

@Module({
  imports: [
    StreamingModule,
    AgentModule,
    LoggerModule,
    SharedModule,
    ContextStorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
