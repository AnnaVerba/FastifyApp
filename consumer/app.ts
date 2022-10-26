import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import { replayKey } from '../src/common/constants/consts';

const durableIsTrue = true;
const hardTestQueue = 'hardTest';
const amqpServer = 'amqp://localhost:5672';

const queue = 'hello';
let consumedMessages = 0;
async function connect() {
  const connection = await amqplib.connect(amqpServer);
  const channel = await connection.createChannel();
  await channel.assertExchange('exchange1', 'topic', {
    durable: durableIsTrue,
  });

  await channel.assertQueue(queue, {
    durable: durableIsTrue,
  });
  await channel.assertQueue('replay', {
    durable: durableIsTrue,
  });

  await channel.bindQueue(queue, 'exchange1', 'user.info');

  function publisher(msg: any) {
    logger.info(' [x] Received %s' + msg.content.toString());
    channel.publish(
      'exchange1',
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
        `consumed: ${consumedMessages} timestamp: ${timestamp} message: ${msg.content.toString()}`,
      );
    if (msg === null) {
      consumedMessages = 0;
    }
  }
  try {
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    await channel.consume(hardTestQueue, hardtest, { noAck: true });
    await channel.consume(queue, publisher, {
      noAck: true,
    });
  } catch (error) {
    console.log(error);
  }
}

connect();
