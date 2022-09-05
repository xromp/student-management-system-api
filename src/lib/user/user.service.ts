import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Role } from '../role/role.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create({ password, ...createUserDto }: CreateUserDto) {
    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash: await this.getHashPassword(password),
    });
    return createdUser.save();
  }

  async bulkInsert(users: CreateUserDto[]) {
    const createUsers = await Promise.all(
      users.map(async ({ password, ...user }) => ({
        ...user,
        passwordHash: await this.getHashPassword(password),
      })),
    );
    return this.userModel.insertMany(createUsers);
  }

  find(userQry: UserDto) {
    return this.userModel.find(userQry);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(userQry: UserDto) {
    return this.userModel.findOne(userQry);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(_id: string) {
    return this.userModel.remove({ _id });
  }

  async getHashPassword(password) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    return await bcrypt.hash(password, salt);
  }

  async seedInitialUser() {
    const users: CreateUserDto[] = [
      {
        userName: 'admin',
        password: 'password',
        role: Role.Administrator,
      },
      {
        userName: 'teacher',
        password: 'password',
        role: Role.Teacher,
      },
    ];
    const hasUser = await this.findOne({});
    if (!hasUser) this.bulkInsert(users);
    return true;
  }
}
