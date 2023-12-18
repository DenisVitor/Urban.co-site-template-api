import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginAccessDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
