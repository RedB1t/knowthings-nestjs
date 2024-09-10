import {InputType, Field, PartialType} from '@nestjs/graphql';
import {Types} from "mongoose";

import {CreateUserInput} from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: Types.ObjectId;
}
