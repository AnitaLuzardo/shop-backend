import { IsBoolean, IsDate, IsArray, IsNumber, IsOptional }  from "class-validator";
import { Type } from 'class-transformer';

export class CreateShoppingscartDto {

  @IsDate()
  @Type(() => Date)
  date_created: Date;

  @IsArray()
  @IsNumber({}, { each: true })
  products: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional() // Hacer que discounts sea opcional
  discounts?: number[];

  @IsNumber()
  userId: number;
}
