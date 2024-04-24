import { Module } from '@nestjs/common';
import { ShoppingscartsService } from './shoppingscarts.service';
import { ShoppingscartsController } from './shoppingscarts.controller';

@Module({
  controllers: [ShoppingscartsController],
  providers: [ShoppingscartsService],
})
export class ShoppingscartsModule {}
