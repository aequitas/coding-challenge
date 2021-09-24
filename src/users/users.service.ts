import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    // TODO not handling password for demo, should be passed to Passport in future
    delete createUserDto.password;

    const users = await this.knex.table('users').insert({
      name: createUserDto.name,
      email: createUserDto.email,
    });

    return { users };
  }

  async findAll() {
    const users = await this.knex.table('users');
    return { users };
  }

  async findOne(id: number, userId: number) {
    const users = await this.knex
      .table('users')
      .where('id', id)
      .where('id', userId);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId: number) {
    if ('password' in updateUserDto) {
      // TODO not handling password for demo, should be passed to Passport in future
      delete updateUserDto.password;

      // check if there is anything left to update after password
      if (Object.keys(updateUserDto).length == 0) {
        // return similar response as a normal update would
        return { users: 1 };
      }
    }

    const users = await this.knex
      .table('users')
      .where('id', id)
      .where('id', userId)
      .update({
        name: updateUserDto.name,
        email: updateUserDto.email,
      });

    return { users };
  }

  async remove(id: number, userId: number) {
    const users = await this.knex
      .table('users')
      .where('id', id)
      .where('id', userId)
      .del();
    return { users };
  }
}
