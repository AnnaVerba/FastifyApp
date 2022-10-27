import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from '../messaging_with_rabbitqm/messaging.service';
import { MessagingController } from '../messaging_with_rabbitqm/messaging.controller';
import {exchange1, hardTestExchange, isTopic} from '../../common/constants';
import { appConfig } from '../../common/config/app.config';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie]),

    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: exchange1,
          type: isTopic,
        },
        {
          name: hardTestExchange,
          type: isTopic,

          options:{
         mandatory:true,
          }
        },
      ],

      uri: appConfig.getUri(),
    }),
    MovieModule,
  ],

  providers: [
    MovieService,
    MessagingService,
    MovieController,
    MessagingController,
  ],
  controllers: [MovieController, MessagingController],
})
export class MovieModule {}
