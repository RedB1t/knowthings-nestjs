import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({description: 'unique username for the login'})
  username: string;

  @Field({description: 'password for the login'})
  password: string;

  @Field({description: 'unique email of the user'})
  email?: string;
}
