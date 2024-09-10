import {ObjectType, Field} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Types} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({timestamps: true})
export class User {
  @Field(() => String, {description: 'unique identifier of user'})
  _id: Types.ObjectId;

  @Field({description: 'unique username for the login'})
  @Prop({unique: true})
  username: string;

  @Field({description: 'password for the login'})
  @Prop()
  password: string;

  @Field({description: 'unique email of the user'})
  @Prop()
  email?: string;
}


export const UserSchema = SchemaFactory.createForClass(User);