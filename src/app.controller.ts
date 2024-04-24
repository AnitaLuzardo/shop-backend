import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

//TODO http:localhost:3000 una vez que ingresa al localhost
//tiene un decorador es una función que se encarga de añadir anotaciones
//metadatos o cambiar el comportamiento de una clase, propiedad o metodos

@ApiTags('items')
@Controller('items')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(): string[]{
    //el controlador llama un servicio
    return this.appService.getUsers();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
