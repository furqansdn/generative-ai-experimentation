import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  AbstractLogger,
  LoggerKey,
} from 'common/utils/logger/interfaces/logger';

@Injectable()
export class AppService {
  constructor(@Inject(LoggerKey) private logger: AbstractLogger) {}
  getHello(): string {
    throw new ForbiddenException('Example Error');
  }
}
