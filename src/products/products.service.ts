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

    return this.productRepo.save(newProduct);
  }

  async findOne(id: number) {

    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['images']
    });
    if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productRepo.findOne({ where: {id} });
    
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    existingProduct.name = updateProductDto.name;
    existingProduct.description = updateProductDto.description;
    existingProduct.price = updateProductDto.price;
    existingProduct.images = updateProductDto.images;

    return this.productRepo.save(existingProduct);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({ where: {id} })

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const productId = product.id;
    
    await this.productRepo.remove(product);

    return `Product has been removed "${product.name}" (ID: ${productId})`
  }
}
