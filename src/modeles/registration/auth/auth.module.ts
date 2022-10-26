import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfig, appConfig } from '../config/app.config';
import { UserEntity } from '../model/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { UserService } from '../user.service';
import { UserRepository } from '../repository/UserRepository';
import EmailService from '../email.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: appConfig.getAppSecret(),
      signOptions: {
        expiresIn: appConfig.getJwtExpired(),
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
    UserService,
    UserRepository,
    EmailService,
    AppConfig,
  ],
})
export class AuthModule {}
