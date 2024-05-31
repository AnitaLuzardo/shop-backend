import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  lastname: string
  
  @IsNotEmpty()
  phone: number

  @IsNotEmpty() //DECORADORES
  email: string

  @MinLength(6)
  @MaxLength(12)
  pwd: string
}
