// import { Exclude } from "class-transformer";
import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
  @IsEmail()
  email: string;

  // @Exclude() no se puede colocar acá
  @MinLength(6)
  @MaxLength(12)
  pwd: string;
}