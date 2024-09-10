import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {hash} from "bcrypt";
import {Model, Types} from "mongoose";

import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {User} from "./entities/user.entity";

const saltRounds = 10;

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await hash(createUserInput.password, saltRounds);
    return this.userModel.create(createUserInput);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: Types.ObjectId) {
    return this.userModel.findOne({_id: id}).exec();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({username}).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }

  update(id: Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate({_id: id}, updateUserInput).exec();
  }

  remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete({_id: id}).exec();
  }
}
