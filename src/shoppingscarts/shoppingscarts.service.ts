import { Injectable } from '@nestjs/common';
import { CreateShoppingscartDto } from './dto/create-shoppingscart.dto';
import { UpdateShoppingscartDto } from './dto/update-shoppingscart.dto';

@Injectable()
export class ShoppingscartsService {
  create(createShoppingscartDto: CreateShoppingscartDto) {
    return 'This action adds a new shoppingscart';
  }

  findAll() {
    return `This action returns all shoppingscarts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingscart`;
  }

  update(id: number, updateShoppingscartDto: UpdateShoppingscartDto) {
    return `This action updates a #${id} shoppingscart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingscart`;
  }
}
