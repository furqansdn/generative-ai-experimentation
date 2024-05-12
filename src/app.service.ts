import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new UnprocessableEntityException('Example Error');
    return 'Hello World!';
  }
}
