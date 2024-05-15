import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  signIn(name: string, pwd: string) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.pwd);
      if (isPasswordValid) {
        // Si la contraseña es válida, devuelve el usuario sin la contraseña
        const { pwd, ...result } = user;
        return result;
      }
    }
    // Si el usuario no existe o la contraseña es incorrecta, lanza una excepción
    throw new UnauthorizedException('Invalid credentials');
  }
}
