import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
