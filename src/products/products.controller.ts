  
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('products')
@Controller('products') 
//todas la rutas que hagan uso de localhost:3000/products llegaran a este controlador
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

   //Todo viene ordenado por su service (productsService)
  // @UseGuards(jwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    //acá es donde se conectan las consultas a la base de datos
    //Aquí viene todo enviado por POST Body

    return this.productsService.create(createProductDto);
  }

  // @UseGuards(jwtAuthGuard)
  @Get()
  async findAll(): Promise<Product[] | string> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return [];
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.productsService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
            error: 'Product not found',
            message: 'This product does not exist in our store'
        };
      }
      throw error;
    }
  }

  @UseGuards(jwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 'This product does not exist in our store';
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      return { message: 'Error deleting product', error }
    }
  }
}
