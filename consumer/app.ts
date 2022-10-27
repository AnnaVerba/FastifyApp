import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import {exchange1, hardTestExchange, publishUserInfoKey, replayKey, testKey} from '../src/common/constants';

const isDurable = true;
const hardTestQueue = 'hardTest';

import {appConfig} from "./config/app.config";

console.log(process.env.amqpServer)
const queue = 'hello';
const replayQueue = 'replay';
let consumedMessages = 0;
async function connect() {
  const connection = await amqplib.connect( appConfig.getAmqplib());
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange1, 'topic', {
    durable: isDurable,
  });

  await channel.assertQueue(queue, {
    durable: isDurable,
  });
  await channel.assertQueue(replayQueue, {
    durable: isDurable,
  });
  await channel.bindQueue(queue, exchange1, publishUserInfoKey );
    await channel.bindQueue(hardTestQueue, hardTestExchange, testKey );
 await channel.prefetch(1);

  function publisher(msg: any) {
    logger.info(' [x] Received %s' + msg.content.toString());
    channel.publish(
      exchange1,
      replayKey,
      Buffer.from(msg.content.toString()),
    );
  }
  function hardtest(msg: any) {
    const date = new Date();
    const timestamp = `${date.toLocaleTimeString()}:${date.getMilliseconds()}`;
    consumedMessages++;
    if (msg != null)
      logger.info(
        `Number of consumed: ${consumedMessages} consumed at: ${timestamp} message(published at): ${msg.content.toString()}`,
      );
  }
  try {
    console.log(' [*] Waiting for messages in queues. To exit press CTRL+C', queue);
    await channel.consume(hardTestQueue, hardtest, { noAck: true });
    await channel.consume(queue, publisher, {
      noAck: true,
    });
  } catch (error) {
    console.log(error);
  }
}

connect();
