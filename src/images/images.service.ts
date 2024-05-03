import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ImagesService {

  constructor(
    @InjectRepository(Image) private imageRepo: Repository<Image>,
    @InjectRepository(Product) private productRepo: Repository <Product>
  ){}

  async create(createImageDto: CreateImageDto) {
    const product = await this.productRepo.findOne({ where: { id: createImageDto.productId } });
    if(!product){
      throw new NotFoundException('Product not found');
    } //Por si no hay producto
    const newImage = new Image(); //Si hay producto crea la imagen
    newImage.product = product; //Se adjunta al producto
    newImage.url = createImageDto.url; //Le agrega la URL
    
    return this.imageRepo.save(newImage); 
    //Y se guarda y se pueden agregar muchas fotos al mismo producto

    // return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
