import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomLoggerService } from 'common/utils/logger';
import * as compression from 'compression';
import { AllExceptionsFilter } from 'filters/all-exception.filter';
import { HttpExceptionFilter } from 'filters/bad-request.filter';
import helmet from 'helmet';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLoggerService(),
    cors: true,
  });

  app.use(helmet());

  app.use(compression());

  const reflector = app.get(Reflector);

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter),
    new HttpExceptionFilter(reflector),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
}
bootstrap();
