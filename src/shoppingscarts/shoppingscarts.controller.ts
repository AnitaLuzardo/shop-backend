import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { ShoppingscartsService } from './shoppingscarts.service';
import { CreateShoppingscartDto } from './dto/create-shoppingscart.dto';
import { UpdateShoppingscartDto } from './dto/update-shoppingscart.dto';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('shoppings/carts')
@Controller('shoppings/carts')
export class ShoppingscartsController {
  constructor(private readonly shoppingscartsService: ShoppingscartsService) {}
  
  @Post('addproducts')
  @UseGuards(jwtAuthGuard)
  save(@Request() req, @Body() createShoppingscartDto: CreateShoppingscartDto) {
  
    const userId = Number(req.user.id);
    console.log('User ID', userId);
    
    return this.shoppingscartsService.create(createShoppingscartDto, userId);
  }
  
  @Get('list')
  @UseGuards(jwtAuthGuard)
  async findByUser(@Request() req ) {
    console.log('User in Controller:', req.user)
    const userId = Number(req.user.id);
    console.log('User ID:', userId);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
  
    return await this.shoppingscartsService.findByUserServ(userId);
  }

  @Get(':id')
  @UseGuards(jwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.shoppingscartsService.findOne(id);
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
