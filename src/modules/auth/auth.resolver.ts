import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { Public } from '@shared/decorators';
import { CreateUserInput } from '@modules/users/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Query(() => Boolean, { name: 'signIn' })
  async signIn(@Args('username') username: string, @Args('password') password: string, @Context('res') response: Response) {
    const token = await this.authService.signIn(username, password);
    
    response.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: true,
      domain: 'localhost',
    });

    return true;
  }

  @Public()
  @Mutation(() => Boolean)
  async signUp(@Args('userToRegister') userToRegister: CreateUserInput, @Context('res') response: Response) {
    const token = await this.authService.signUp(userToRegister);

    response.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: true,
      domain: 'localhost',
    });

    return true;
  }
}
