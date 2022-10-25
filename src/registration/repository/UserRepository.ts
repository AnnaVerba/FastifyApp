import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UserEntity } from '../model/user.entity';

import { LoginUserDto } from '../model/dto/LoginUser';

export class UserRepository {
  constructor(
    @InjectModel(UserEntity)
    private readonly user: typeof UserEntity,
  ) {}

  async create(data: LoginUserDto): Promise<UserEntity> {
    return this.user.create({ ...data });
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.user.findOne({
      where: {
        id,
      },
    });
  }

  async find(): Promise<any> {
    return this.user.findAll();
  }

  async findOneEmail(email: string): Promise<UserEntity> {
    return this.user.findOne({
      where: {
        email,
      },
    });
  }

  async searchByName(name: string): Promise<UserEntity[]> {
    return this.user.findAll({
      where: {
        [Op.or]: [
          {
            name: { [Op.iLike]: `%${name}%` },
          },
        ],
      },
    });
  }

  async confirm(email: string): Promise<any> {
    return this.user.update(
      { emailconfirmed: true },
      { where: { email: email } },
    );
  }

  async updateToken(id: string, refreshToken: string): Promise<void> {
    await this.user.update(
      {
        refreshToken,
      },
      {
        where: { id },
      },
    );
  }

  async delete(email: string): Promise<void> {
    await this.user.destroy({
      where: { email },
    });
  }

  async findByEmail(email: string) {
    return this.user.findOne({
      where: {
        email,
      },
    });
  }
}
