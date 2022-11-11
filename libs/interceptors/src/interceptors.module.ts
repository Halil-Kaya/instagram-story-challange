import { Module } from '@nestjs/common';
import { InterceptorsService } from './interceptors.service';

@Module({
  providers: [InterceptorsService],
  exports: [InterceptorsService],
})
export class InterceptorsModule {}
