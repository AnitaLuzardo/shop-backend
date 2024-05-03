import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';


@ApiTags('products')
@Controller('products') 
//todas la rutas que hagan uso de localhost:3000/products llegaran a este controlador
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

   //Todo viene ordenado por su service (productsService)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    //acá es donde se conectan las consultas a la base de datos
    //Aquí viene todo enviado por POST Body

    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[] | string> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 'No tenemos productos en estos momentos';
      }
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
