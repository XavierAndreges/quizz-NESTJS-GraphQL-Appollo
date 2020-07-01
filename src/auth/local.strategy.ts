import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/models/user/user.entity';

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
      private readonly authService: AuthService,
      ) {
    super();
    console.log("LocalStrategy => constructor()");
  }

  async validate(mail: string, password: string): Promise<User> {
    console.log("LocalStrategy => validate() : mail, password", mail, password);
    const user = await this.authService.validateUser(mail, password);
    console.log("LocalStrategy => validate() : user", user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}