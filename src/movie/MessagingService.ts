import { Injectable } from '@nestjs/common';

import { ConsumeMessage } from 'amqplib';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { replayKey } from '../../shared/consts';
import logger from '../../winstonLogger/Logger';
@Injectable()
export class MessagingService {
  @RabbitRPC({
    routingKey: replayKey,
    exchange: 'exchange1',
    queue: 'hello',
  })
  public async rpcHandler(msg: any, amqpMsg: ConsumeMessage) {
    logger.info(
      'Routing key:' +
        amqpMsg.fields.routingKey +
        `\nProducer received :` +
        amqpMsg.content.toString(),
    );

    return msg;
  }
}
