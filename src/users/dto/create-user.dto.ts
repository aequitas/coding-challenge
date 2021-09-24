import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
