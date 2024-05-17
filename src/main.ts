import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import NestLoggerServiceAdapter from 'common/utils/logger/nestlogger-service-adapter';
import * as compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from 'setup-swagger';
import { ConfigService } from 'shared/service/config.service';
import { SharedModule } from 'shared/shared.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/bad-request.filter';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const logger = app.get(NestLoggerServiceAdapter);
  app.useLogger(logger);

  app.use(helmet());

  app.use(compression());

  const reflector = app.get(Reflector);

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter, logger),
    new HttpExceptionFilter(reflector),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const configService = app.select(SharedModule).get(ConfigService);

  const appSetting = configService.appSetting;

  if (appSetting.enabledDocumentation) {
    setupSwagger(app);
  }
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  await app.listen(appSetting.port);
  console.info(`server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();
