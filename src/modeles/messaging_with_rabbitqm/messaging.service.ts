import { Injectable } from '@nestjs/common';

import { ConsumeMessage } from 'amqplib';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import logger from '../../../winstonLogger/Logger';
import { ExchangeType } from '../../common/types';
import {
  exchange1,
  hardTestExchange,
  queueForMovie,
  replayKey,
  testKey,
} from '../../common/constants';

const ExchangeMovie: ExchangeType = {
  routingKey: replayKey,
  exchange: exchange1,
  queue: queueForMovie,
};
@Injectable()
export class MessagingService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

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

  async hardTest() {
    const totalMessages = 3000;
    for (let n = 1; n <= totalMessages; n++) {
      const datatime = new Date();
      const timestamp = `${datatime.toLocaleTimeString()} : ${datatime.getMilliseconds()}`;
      this.amqpConnection.publish(
        hardTestExchange,
        testKey,
        Buffer.from(timestamp),
      );
      logger.info(`${n} :${timestamp}`);
    }
  }
}
