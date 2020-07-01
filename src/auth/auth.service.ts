import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class AuthService {

    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}

  async validateUser(mail: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByMail(mail);
    console.log("AuthService => validateUser() : mail, pass", mail, pass);
    console.log("AuthService => validateUser() : user", user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log("AuthService => validateUser() : result", result);
      return result;
    }
    console.log("AuthService => validateUser() : NULL !!!");
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.password };
    console.log("AuthService => login() : payload", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
