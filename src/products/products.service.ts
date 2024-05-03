import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ){}
  
  async findAll(): Promise<Product[] | string> {
    const products = await this.productRepo.find();
    if (products.length === 0) {
      throw new NotFoundException('No tenemos productos en estos momentos');
    }
    return products;
  } 

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepo.create(createProductDto)

    // const createdProduct = await 
    // console.log('Producto creado satisfactoriamente:', createdProduct);
    
    // return 'Creaste un nuevo producto';
    return this.productRepo.save(newProduct);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
