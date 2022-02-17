import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  
  test: boolean;

 // async validateUser(email: string, pass: string): Promise<any> {
  //   const userFind = await this.usersService.findByEmail(email);
   
  //     const checkPass = await bcrypt.compare(pass, userFind.password).then(res => {
  //       if (userFind && res) {
  //         const { password, ...result } = userFind;          
  //         return result;
  //       } else {
  //         return null;
  //       }
  //     })

  //     return checkPass;
  // }


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const checkPass = await bcrypt.compare(pass, user.password).then(res => {
      if (user && res) {
      const { password, ...result } = user;          
      return result;
      } else {
      return null;
      }
    })

    return checkPass;
  }

  // async login(userFind: any) {
  //   const payload = { id : userFind.id, username : userFind.username, email: userFind.email, password: userFind.password, isAdmin: userFind.isAdmin  };
  //   return this.jwtService.sign(payload)
  // }

  async login(user: any) {
    const payload = { username: user.username, email: user.email, isAdmin: user.isAdmin, isModo: user.isModo, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  checkPassword(password: string, hashedPassword: string ) {
    
    let test2 = bcrypt.compare(password, hashedPassword, function(err, res) {
      if (err){
        console.log('error');
        return res
      }
      if (res) {
        console.log('password match');
        console.log(res);
        // const waouw = res
        return res
      } else {
        console.log('passwords do not match');
        return res
      }
    })
    console.log("resultat de la fonction bcrypt compare: " + test2)
    
  }

  passwordHash(userPassword: string) {
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(userPassword, saltOrRounds)
    return hash
  }
}