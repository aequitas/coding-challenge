import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.knex.table('users').insert({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return { users };
  }

  async findAll(userId: number) {
    const users = await this.knex.table('users').where('id', userId);
    return { users };
  }

  async findOne(id: number, userId: number) {
    const users = await this.knex.table('users').where('id', id).where('id', userId);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId: number) {
    const users = await this.knex.table('users').where('id', id).where('id', userId).update({
      name: updateUserDto.name,
      email: updateUserDto.email,
    });

    return { users };
  }

  async remove(id: number, userId: number) {
    const users = await this.knex.table('users').where('id', id).where('id', userId).del();
    return { users };
  }
}
