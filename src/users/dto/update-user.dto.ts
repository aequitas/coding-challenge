import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;

  @IsEmail()
  email: string;
}
