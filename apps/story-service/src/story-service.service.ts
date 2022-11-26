import { Injectable } from '@nestjs/common';

@Injectable()
export class StoryServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
