import { Injectable } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class HobbiesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createHobbyDto: CreateHobbyDto, userId: number) {
    const hobbies = await this.knex.table('hobbies').insert({
      name: createHobbyDto.name,
      description: createHobbyDto.description,
      userId: userId,
    });

    return { hobbies };
  }

  async findAll(userId: number) {
    const hobbies = await this.knex.table('hobbies').where({userId: userId});
    return { hobbies };
  }

  async findOne(id: number, userId: number) {
    const hobbies = await this.knex.table('hobbies').where('id', id).where({userId: userId});
    return { hobbies };  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto, userId: number) {
    const hobbies = await this.knex.table('hobbies').where('id', id).where({userId: userId}).update({
      name: updateHobbyDto.name,
      description: updateHobbyDto.description,
    });

    return { hobbies };
  }

  async remove(id: number, userId: number) {
    const hobbies = await this.knex.table('hobbies').where('id', id).where({userId: userId}).del();
    return { hobbies };
  }
}
