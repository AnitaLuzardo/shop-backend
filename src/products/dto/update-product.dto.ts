import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Image } from 'src/images/entities/image.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	name?: string;
	description?: string;
	price?: number;
	images?: Image[];
}
