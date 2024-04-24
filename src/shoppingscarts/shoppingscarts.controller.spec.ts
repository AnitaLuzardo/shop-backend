import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingscartsController } from './shoppingscarts.controller';
import { ShoppingscartsService } from './shoppingscarts.service';

describe('ShoppingscartsController', () => {
  let controller: ShoppingscartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingscartsController],
      providers: [ShoppingscartsService],
    }).compile();

    controller = module.get<ShoppingscartsController>(ShoppingscartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
