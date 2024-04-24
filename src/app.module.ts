import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShoppingscartsModule } from './shoppingscarts/shoppingscarts.module';

@Module({
  imports: [ProductsModule, ShoppingscartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
