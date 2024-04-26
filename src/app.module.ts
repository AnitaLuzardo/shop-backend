import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShoppingscartsModule } from './shoppingscarts/shoppingscarts.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DiscountsModule } from './discounts/discounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shoppingCart',
      password: 'zaq12wsx',
      database: 'ecommerce',
      entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
      synchronize: true,
    }),
    ProductsModule, 
    ShoppingscartsModule, 
    UsersModule, 
    DiscountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
