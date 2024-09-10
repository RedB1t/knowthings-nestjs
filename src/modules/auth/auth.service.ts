import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {compare, hash} from "bcrypt";

import {UsersService} from "@modules/users/users.service";
import {CreateUserInput} from "@modules/users/dto/create-user.input";

const saltRounds = 10;

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async signIn(username: string, pass: string): Promise<string> {
    const user = await this.usersService.findByUsername(username);
    if (!await compare(pass, user?.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async signUp(userToRegister: CreateUserInput): Promise<string> {
    if (await this.usersService.findByUsername(userToRegister.username)) {
      throw new BadRequestException('Username already exists');
    }
    if (await this.usersService.findByEmail(userToRegister.email)) {
      throw new BadRequestException('Email already exists');
    }


    userToRegister.password = await hash(userToRegister.password, saltRounds);
    const user = await this.usersService.create(userToRegister);

    const payload = { sub: user._id, username: user.username, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
