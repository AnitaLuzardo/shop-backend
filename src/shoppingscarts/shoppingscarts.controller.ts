import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingscartsService } from './shoppingscarts.service';
import { CreateShoppingscartDto } from './dto/create-shoppingscart.dto';
import { UpdateShoppingscartDto } from './dto/update-shoppingscart.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shoppings/carts')
@Controller('shoppings/carts')
export class ShoppingscartsController {
  constructor(private readonly shoppingscartsService: ShoppingscartsService) {}

  @Post()
  create(@Body() createShoppingscartDto: CreateShoppingscartDto) {
    return this.shoppingscartsService.create(createShoppingscartDto);
  }

  @Get()
  findAll() {
    return this.shoppingscartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingscartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingscartDto: UpdateShoppingscartDto) {
    return this.shoppingscartsService.update(+id, updateShoppingscartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingscartsService.remove(+id);
  }
}
