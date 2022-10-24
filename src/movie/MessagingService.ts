import { Injectable } from '@nestjs/common';

import { ConsumeMessage } from 'amqplib';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MessagingService {
  @RabbitRPC({
    routingKey: 'replay.#',
    exchange: 'exchange1',
    queue: 'hello',
  })
  public async rpcHandler(msg: any, amqpMsg: ConsumeMessage) {
    console.log(
      'Routing key:' + amqpMsg.fields.routingKey,
      `\nMessaging service received :`,
      amqpMsg.content.toString(),
    );

    return msg;
  }
}
