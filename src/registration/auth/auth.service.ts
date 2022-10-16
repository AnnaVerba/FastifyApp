import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as util from 'node:util';
import * as crypto from 'node:crypto';

import { UserService } from '../user.service';
import { UserDto } from '../model/dto/User.dto';

import { LoginUserDto } from '../model/dto/LoginUser';
import { UserEntity } from '../model/user.entity';
import EmailService from '../email.service';

const encryptIterations = 50_000;
const encryptKeyLength = 64;
const encryptDigest = 'sha512';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async registration(dto: LoginUserDto): Promise<UserDto> {
    dto.password = await AuthService.encryptPassword(dto.password);

    const user = await this.userService.create(dto);

    if (user.emailconfirmed === true) {
      await this.sendlink(user.email);
    }
    this.signToken(user);
    return UserDto.mapFrom(user);
  }

  async sendlink(email) {
    const url = `${process.env.EMAIL_CONFIRMATION_URL}/${email}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return await this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }
  async login(dto: LoginUserDto): Promise<UserDto> {
    const user: UserEntity = await this.userService.findByEmail(dto.email);
    if (!(user.emailconfirmed === true)) {
      throw new UnauthorizedException('Your email is not confirmed');
    }
    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    if (!(await AuthService.checkPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    return UserDto.mapFrom(user);
  }

  signToken(user: UserEntity): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }

  private static async encryptPassword(plainPassword: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(
      plainPassword,
      salt,
      encryptIterations,
      encryptKeyLength,
      encryptDigest,
    );

    return salt + ':' + encryptedPassword.toString('hex');
  }

  private static async checkPassword(
    password: string,
    existPassword: string,
  ): Promise<boolean> {
    const [salt, key] = existPassword.split(':');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(
      password,
      salt,
      encryptIterations,
      encryptKeyLength,
      encryptDigest,
    );
    return key === encryptedPassword.toString('hex');
  }

  async regenerateTokens(request): Promise<UserDto> {
    const tokenData = await this.jwtService.decode(
      request.headers.authorization.split(' ')[1],
    );

    const user = await this.userService.findByEmail(tokenData.sub);

    return UserDto.mapFrom(user);
  }

  async confirm(email: string): Promise<string> {
    return await this.userService.confirm(email);
  }
  public async getJwtToken(user: UserEntity): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(id: string): Promise<string> {
    const userDataToUpdate = {
      refreshToken: process.env.JWT_REFRESH_TOKEN_SECRET,
    };

    await this.userService.updateToken(id, userDataToUpdate.refreshToken);
    return userDataToUpdate.refreshToken;
  }
}
