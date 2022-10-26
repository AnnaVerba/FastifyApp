import { IsString } from 'class-validator';
import { LoginUserDto } from './LoginUser';

export class CreateUserDto extends LoginUserDto {
  @IsString()
  name: string;
}
