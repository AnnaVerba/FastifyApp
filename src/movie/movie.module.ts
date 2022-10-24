import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
//import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from './MessagingService';
//import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie]),

    MovieModule,
  ],

  providers: [MovieService, MessagingService, MovieController],
  controllers: [MovieController],
})
export class MovieModule {}
