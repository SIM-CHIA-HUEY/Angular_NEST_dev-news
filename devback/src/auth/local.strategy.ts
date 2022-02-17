import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

// async validate(username: string, password: string): Promise<any> {
  //   console.log("Mdp avant l'appel a la fonction validateUser : " + password)
  //   const userFind = await this.authService.validateUser(username, password);
  //   if (!userFind) {
  //    console.log("le user n'a pas été trouvé")
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return userFind;
  // }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}