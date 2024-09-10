import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';

import { AuthService } from './auth.service';
import {Public} from "@shared/decorators";
import {CreateUserInput} from "@modules/users/dto/create-user.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Query(() => String, {name: 'signIn'})
  signIn(@Args('username') username: string, @Args('password') password: string) {
    return this.authService.signIn(username, password);
  }

  @Public()
  @Mutation(() => String)
  signUp(@Args('userToRegister') userToRegister: CreateUserInput) {
    return this.authService.signUp(userToRegister);
  }
}
