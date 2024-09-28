import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShoppingscartDto } from './dto/create-shoppingscart.dto';
import { UpdateShoppingscartDto } from './dto/update-shoppingscart.dto';
import { ShoppingCart } from './entities/shoppingscart.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Discount } from 'src/discounts/entities/discount.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShoppingscartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async create(createShoppingscartDto: CreateShoppingscartDto) {
    const { date_created, products, discounts, userId } = createShoppingscartDto;

    const shoppingCart = new ShoppingCart();
    // shoppingCart.asset = asset;
    shoppingCart.date_created = date_created;
    shoppingCart.products = await this.productRepository.findBy({ id: In(products) }); // Obtener múltiples productos
    shoppingCart.user = await this.userRepository.findOne({ where: { id: userId } }); // Buscar usuario por ID
    
    if (discounts) {
      shoppingCart.discounts = await this.discountRepository.findBy({ id: In(discounts) });
    } else {
      shoppingCart.discounts = [];
    }

    return this.shoppingCartRepository.save(shoppingCart);
    // return 'This action adds a new shoppingscart';
  }

  findAll() {
    return `This action returns all shoppingscarts`;
  }

  async findOne(id: number): Promise<ShoppingCart> {
    return this.shoppingCartRepository.findOne({
      where: { id },
      relations: ['products', 'discounts', 'user'], // Cargar relaciones
    });
  }
  
  update(id: number, updateShoppingscartDto: UpdateShoppingscartDto) {
    return `This action updates a #${id} shoppingscart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingscart`;
  }
}
