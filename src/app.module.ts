import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ShoppingscartsModule } from './shoppingscarts/shoppingscarts.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DiscountsModule } from './discounts/discounts.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';


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
    DiscountsModule, 
    ImagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public', 'images'),
      serveRoot: '/public/images',
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
