import { Module } from '@nestjs/common';
import { ShoppingscartsService } from './shoppingscarts.service';
import { ShoppingscartsController } from './shoppingscarts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shoppingscart.entity';
import { Product } from 'src/products/entities/product.entity';
import { Discount } from 'src/discounts/entities/discount.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCart, 
      Product, 
      Discount, 
      User
    ])
  ],
  controllers: [ShoppingscartsController],
  providers: [ShoppingscartsService],
})
export class ShoppingscartsModule {}
