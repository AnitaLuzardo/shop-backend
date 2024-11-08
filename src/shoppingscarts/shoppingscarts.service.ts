import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createShoppingscartDto: CreateShoppingscartDto, userId: number) {
    const { date_created, products, discounts } = createShoppingscartDto;

    // Verificar si el usuario ya tiene un carrito
    let cart = await this.shoppingCartRepository.findOne({ 
        where: { user: { id: userId } }, 
        relations: ['products', 'discounts']
    });

    if (cart) {
        // Si el carrito ya existe, agregamos los nuevos productos
        const newProducts = await this.productRepository.findBy({ id: In(products) });

        // Verificamos si hay productos duplicados y agregamos solo los nuevos
        const existingProductIds = cart.products.map(product => product.id);
        const productsToAdd = newProducts.filter(product => !existingProductIds.includes(product.id));
        cart.products.push(...productsToAdd);

        // Guardamos los cambios en el carrito
        const updatedCart = await this.shoppingCartRepository.save(cart);

        return {
            cart: updatedCart,
            message: "Productos añadidos al carrito existente"
        };
    }

    // Si el carrito no existe, creamos uno nuevo
    cart = new ShoppingCart();
    cart.date_created = date_created;
    cart.user = await this.userRepository.findOne({ where: { id: userId } });
    cart.products = await this.productRepository.findBy({ id: In(products) });

    if (discounts) {
        cart.discounts = await this.discountRepository.findBy({ id: In(discounts) });
    } else {
        cart.discounts = [];
    }

    const newCart = await this.shoppingCartRepository.save(cart);

    return {
        cart: newCart,
        message: "Carrito creado exitosamente",
    };
  }


  // async create(createShoppingscartDto: CreateShoppingscartDto, userId: number){
  //   const { date_created, products, discounts } = createShoppingscartDto;

  //   // Verificar si el usuario ya tiene un carrito
  //   let cart = await this.shoppingCartRepository.findOne({ 
  //     where: { user: { id: userId } }, 
  //     relations: ['products', 'discounts'] 
  //   });

  //   if (cart) {
  //     // Si el carrito ya existe, lo retornamos
  //     return { cart, message: "Carrito ya existente para el usuario" };
  //   }

  //   // Si el carrito no existe, creamos uno nuevo
  //   cart = new ShoppingCart();
  //   cart.date_created = date_created;
  //   cart.user = await this.userRepository.findOne({ where: { id: userId } });
  //   cart.products = await this.productRepository.findBy({ id: In(products) });

  //   if (discounts) {
  //     cart.discounts = await this.discountRepository.findBy({ id: In(discounts) });
  //   } else {
  //     cart.discounts = [];
  //   }
  
  //   const newCart = await this.shoppingCartRepository.save(cart);

  //   return {
  //     cart: newCart,
  //     message: "Carrito creado exitosamente",
  // };

  //===================================================================  
    
    // const shoppingCart = new ShoppingCart();
    // shoppingCart.asset = asset;
    // shoppingCart.date_created = date_created;
    // shoppingCart.products = await this.productRepository.findBy({ id: In(products) }); // Obtener múltiples productos
    // shoppingCart.user = await this.userRepository.findOne({ where: { id: userId } }); 
    
    // if (discounts) {
    //   shoppingCart.discounts = await this.discountRepository.findBy({ id: In(discounts) });
    // } else {
    //   shoppingCart.discounts = [];
    // }

    // return this.shoppingCartRepository.save(shoppingCart);
    // return 'This action adds a new shoppingscart';
  

  async findByUserServ(userId: number): Promise<ShoppingCart[]> {
    console.log('User ID in Service:', userId);  // Para verificar que userId esté bien

    const carts = await this.shoppingCartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.products', 'product')
      .leftJoinAndSelect('cart.discounts', 'discount')
      .where('cart.userId = :userId', { userId })
      .getMany();

    console.log('Carts Found:', carts);  // Para verificar el resultado de la consulta

    if (!carts.length) {
        throw new NotFoundException('No shopping carts found for this user.');
    }

    return carts;
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

  async remove(id: number): Promise<{ message: string }> {
    const shoppingCart = await this.shoppingCartRepository.findOne({ where: { id } });
    if (!shoppingCart) {
      throw new NotFoundException(`Shopping cart with ID ${id} not found`);
    }
    await this.shoppingCartRepository.remove(shoppingCart);
  
    return { message: `Shopping cart with ID ${id} has been successfully deleted` };
  }
}
