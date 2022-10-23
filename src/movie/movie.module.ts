import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
//import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';
//import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie]),
    //ClientsModule.register([
     // {
      //  name: 'Communication',

       // transport: Transport.RMQ,
       // options: {
        //  urls: ['amqp://localhost:5672'],
        //  queue: 'hello',
         // queueOptions: {
          //  durable: false,
         // },
        //},
     // },
   // ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
    MovieModule, //can be problem
  ],

  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
