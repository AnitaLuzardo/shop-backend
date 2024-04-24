import { PartialType } from '@nestjs/swagger';
import { CreateShoppingscartDto } from './create-shoppingscart.dto';

export class UpdateShoppingscartDto extends PartialType(CreateShoppingscartDto) {}
