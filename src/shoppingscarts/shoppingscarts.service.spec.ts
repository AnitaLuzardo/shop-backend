import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingscartsService } from './shoppingscarts.service';

describe('ShoppingscartsService', () => {
  let service: ShoppingscartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingscartsService],
    }).compile();

    service = module.get<ShoppingscartsService>(ShoppingscartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
