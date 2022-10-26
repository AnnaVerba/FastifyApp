import { Expose, plainToClass } from 'class-transformer';
import { UserEntity } from '../user.entity';
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
  public static mapFrom(data: UserEntity): UserDto {
    return plainToClass(UserDto, data, { excludeExtraneousValues: true });
  }

  public static mapFromMulti<P>(data: UserEntity[]): UserDto[] {
    return data.map(UserDto.mapFrom);
  }
}
