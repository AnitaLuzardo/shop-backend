import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { Exclude } from "class-transformer";
export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  lastname: string
  
  @IsNotEmpty()
  phone: number

  @IsNotEmpty() //DECORADORES
  email: string

  @Exclude()
  @MinLength(6)
  @MaxLength(12)
  pwd: string
}
