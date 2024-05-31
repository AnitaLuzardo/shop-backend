import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { email } = userObject;
    
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Crear el usuario
    const newUser = await this.usersService.create(userObject);

    return newUser;
  }


  async signIn(loginDto: LoginAuthDto) {
    const { email, pwd } = loginDto;
    const user = await this.validateUser(email, pwd);
    if(!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pwd: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      console.log('User found:', user);
      console.log('Password', pwd)
      const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
      console.log('Password valid:', isPasswordValid);
      if (isPasswordValid) {
        const { pwd, ...result } = user;
        return result;
      }
    }
    throw new UnauthorizedException('Invalid credentials, Retry');
  }
}
