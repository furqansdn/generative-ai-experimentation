import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get mssqlConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];

    return {
      entities,
      synchronize: false,
      type: 'mssql',
      name: 'connection1',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      options: { encrypt: false },
    };
  }

  get azureOpenAIConfig() {
    return {
      azureOpenAIEmbeddingsDeploymentName: this.getString(
        'AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME',
      ),
      azureOpenAIDeploymentName: this.getString(
        'AZURE_OPENAI_API_DEPLOYMENT_NAME',
      ),
      azureOpenAIInstanceName: this.getString('AZURE_OPENAI_API_INSTANCE_NAME'),
      azureOpenAIKey: this.getString('AZURE_OPENAI_API_KEY'),
      azureOpenAIVersion: this.getString('AZURE_OPENAI_API_VERSION'),
      temperature: this.getString('AZURE_OPENAI_DEFAULT_TEMPERATURE'),
    };
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
