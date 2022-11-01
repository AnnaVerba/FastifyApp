import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './movie/models/movie.model';
import { UploadModule } from './upload/uploadFile/upload.module';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './registration/auth/auth.module';
import { ConsulModule } from 'nestjs-consul';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './registration/model/user.entity';
//import { ConsulServiceModule } from 'nest-consul-service';


@Module({
  imports: [
    ConsulModule.forRoot<{
      'your/keypath': {
        value1: number,
        value2: string,
      };
    }>(
        {
          updateCron: '* * * * *',
          connection: {
            protocol: 'http',
            port: 8500,
            host: 'localhost',
            token: 'mutoken',
          },

        },
    ),
    //
    // ConsulServiceModule.register({
    //   serviceId: 'node1',
    //   serviceName: 'produser',
    //   port: 3002,
    //   consul: {
    //     discovery_host: 'localhost',
    //     health_check: {
    //       timeout: '1s',
    //       interval: '10s',
    //     },
    //   }
    // }),

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
