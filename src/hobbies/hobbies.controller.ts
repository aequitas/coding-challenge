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
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';

// TODO poor man's login for demo purposes, assuming user 1 is always
// logged in, to be replaced with Passport in the future.
const loggedInUserId = 1;

@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
  create(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbiesService.create(createHobbyDto, loggedInUserId);
  }

  @Get()
  findAll() {
    return this.hobbiesService.findAll(loggedInUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbiesService.findOne(+id, loggedInUserId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbiesService.update(+id, updateHobbyDto, loggedInUserId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { hobbies } = await this.findOne(id);

    if (!hobbies[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.hobbiesService.remove(+id, loggedInUserId);
  }
}
