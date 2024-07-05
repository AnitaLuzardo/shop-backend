import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShoppingscartsService } from './shoppingscarts.service';
import { CreateShoppingscartDto } from './dto/create-shoppingscart.dto';
import { UpdateShoppingscartDto } from './dto/update-shoppingscart.dto';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shoppings/carts')
@Controller('shoppings/carts')
export class ShoppingscartsController {
  constructor(private readonly shoppingscartsService: ShoppingscartsService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createShoppingscartDto: CreateShoppingscartDto) {
    console.log(req.user);

    const userId = req.user.userId; // Obtener el userId del token JWT
    
    return this.shoppingscartsService.create({
      ...createShoppingscartDto,
      userId, // Añadir el userId al DTO
    });
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
