import { Test, TestingModule } from '@nestjs/testing';
import { InterceptorsService } from './interceptors.service';

describe('InterceptorsService', () => {
  let service: InterceptorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterceptorsService],
    }).compile();

    service = module.get<InterceptorsService>(InterceptorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
