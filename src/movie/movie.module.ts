import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from './MessagingService';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie]),

    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],

      uri: 'amqp://localhost:5672',
    }),
    MovieModule,
  ],

  providers: [MovieService, MessagingService, MovieController],
  controllers: [MovieController],
})
export class MovieModule {}
