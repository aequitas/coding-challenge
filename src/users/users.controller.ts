import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// TODO poor man's login for demo purposes, assuming user 1 is always
// logged in, to be replaced with Passport in the future.
const loggedInUserId = 1;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (+id != loggedInUserId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.usersService.findOne(+id, loggedInUserId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (+id != loggedInUserId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.usersService.update(+id, updateUserDto, loggedInUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (+id != loggedInUserId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.usersService.remove(+id, loggedInUserId);
  }
}
