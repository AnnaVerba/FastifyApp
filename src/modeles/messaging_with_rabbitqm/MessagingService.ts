import { Injectable } from '@nestjs/common';

import { ConsumeMessage } from 'amqplib';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { replayKey } from '../../common/constants/consts';
import logger from '../../../winstonLogger/Logger';

import { ExchangeType } from '../../common/types';
const ExchangeMovie: ExchangeType = {
  routingKey: replayKey,
  exchange: 'exchange1',
  queue: 'hello',
};
@Injectable()
export class MessagingService {
  @RabbitRPC(ExchangeMovie)
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
