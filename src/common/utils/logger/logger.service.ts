import { Inject, Injectable } from '@nestjs/common';

// import { INQUIRER } from '@nestjs/core';
// import { ConfigService } from 'shared/service/config.service';
import ContextStorageService from '../context-storage/context-storage.service';
import { ContextStorageServiceKey } from '../context-storage/interfaces/context-storage.interface';
import {
  AbstractLogger,
  LogData,
  LoggerBaseKey,
  LogLevel,
} from './interfaces/logger';

@Injectable()
export default class LoggerService {
  private sourceClass: string;
  private organization: string;
  private context: string;
  private app: string;

  constructor(
    @Inject(LoggerBaseKey) private logger: AbstractLogger,
    // @Inject(INQUIRER) protected parentClass: object,
    @Inject(ContextStorageServiceKey)
    private contextStorageService: ContextStorageService,
  ) {
    this.sourceClass = 'jancuk';

    console.log(this.sourceClass);

    this.organization = 'HOTD';
    this.context = 'HR Backend APPS';
    this.app = 'Industrial Relation Portal';
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ) {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }

  public debug(message: string, data?: LogData, profile?: string) {
    return this.logger.debug(message, this.getLogData(data), profile);
  }

  public info(message: string, data?: LogData, profile?: string) {
    return this.logger.info(message, this.getLogData(data), profile);
  }

  public warn(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.warn(message, this.getLogData(data), profile);
  }

  public error(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.error(message, this.getLogData(data), profile);
  }

  public fatal(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.fatal(message, this.getLogData(data), profile);
  }

  public emergency(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.emergency(message, this.getLogData(data), profile);
  }

  private getLogData(data?: LogData): LogData {
    return {
      ...data,
      organization: data?.organization || this.organization,
      context: data?.context || this.context,
      app: data?.app || this.app,
      sourceClass: data?.sourceClass || this.sourceClass,
      correlationId:
        data?.correlationId || this.contextStorageService.getContextId(),
    };
  }

  public startProfile(id: string) {
    this.logger.startProfile(id);
  }
}
