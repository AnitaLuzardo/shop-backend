import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hoooliiiis, este si!!';
  }

  getUsers():string[]{
    //En esta parte del servicio en donde se suele inyectar
    //los modelos ya sea MySQL o cualquier base de datos que se maneje
    return [
      'Nana',
      'Nina',
      'Nona',
    ]
  }
}
