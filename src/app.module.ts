import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movie/models/movie.model';
import { UploadModule } from './upload/uploadFile/upload.module';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './registration/auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './registration/model/user.entity';

console.log(process.env.database);
@Module({
  imports: [
    SequelizeModule.forRoot({
      database: process.env.database,
      username: process.env.owner,
      password: process.env.password,
      host: 'localhost',
      dialect: 'postgres',
      protocol: 'postgres',

      models: [Movie, UserEntity],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MovieModule,
    UploadModule,
    AuthModule,
  ],
})
export class AppModule {}
