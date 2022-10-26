import { UserRepository } from './repository/UserRepository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './model/user.entity';
import { LoginUserDto } from './model/dto/LoginUser';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    console.log(user);

    return user;
  }

  async create(data: LoginUserDto): Promise<UserEntity> {
    const userEmailCheck = await this.findByEmail(data.email);
    if (userEmailCheck) {
      throw new ConflictException(`Error create new user`);
    }

    return this.userRepository.create(data);
  }

  async updateToken(id: string, refreshToken): Promise<void> {
    await this.userRepository.updateToken(id, refreshToken);
  }

  async confirm(email: string): Promise<string> {
    return this.userRepository.confirm(email);
  }
}
