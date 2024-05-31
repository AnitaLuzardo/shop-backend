import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

type UserWithoutPassword = Omit<User, 'pwd'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}

  async findAll(): Promise<UserWithoutPassword[] | string> {
    const users = await this.userRepo.find();

    if (users.length === 0) {
      throw new NotFoundException('There are no registered users');
    }

    const usersWithoutPassword = users.map(({ pwd, ...user }) => user);

    return usersWithoutPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, lastname, phone, email, pwd } = createUserDto;

    const existingUser = await this.userRepo.findOne({ where: {email} });
    if (existingUser) {
      throw new Error('User already exists');
    } 

    const saltOrRounds = 10;

    const salt = await bcrypt.genSalt(saltOrRounds);
  
    const hashedPassword = await bcrypt.hash(pwd, salt);

    const newUser = this.userRepo.create({
      name,
      lastname,
      phone,
      email,
      pwd: hashedPassword // Guarda la contraseña encriptada
    });

    const savedUser = await this.userRepo.save(newUser);
    
    // Excluir el campo pwd del usuario devuelto
    const { pwd: _, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }
  
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
