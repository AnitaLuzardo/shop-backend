import { PartialType } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  lastname: string
  
  @IsNotEmpty()
  phone: number

  @IsNotEmpty()
  @IsEmail() //DECORADORES
  email: string

  @MinLength(6)
  @MaxLength(12)
  pwd: string
}