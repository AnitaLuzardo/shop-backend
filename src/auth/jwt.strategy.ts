import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from "src/users/users.service";
import { jwtConstanst } from "./jwt.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(
  //   private readonly configService: ConfigService,
  //   private readonly usersService: UsersService,
  // ) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     ignoreExpiration: false,
  //     secretOrKey: configService.get<string>('JWT_SECRET'), 
  //   });
  // }

  // async validate(payload: any) {
  //   return await this.usersService.findOne(payload.sub);
  // }

  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstanst.secret,
    });
  }

  async validate(payload: any) {
    return await this.usersService.findOne(payload.sub);
  }
}
