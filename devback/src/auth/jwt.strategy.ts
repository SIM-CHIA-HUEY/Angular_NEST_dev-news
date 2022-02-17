import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    
  }


  async validate(payload: any) {
    //return { id : payload.id, username : payload.username, email: payload.email, password: payload.password, isAdmin: payload.isAdmin };
    return { id : payload.sub, username : payload.username, email: payload.email, isAdmin: payload.isAdmin, isModo: payload.isModo, };
  }
}