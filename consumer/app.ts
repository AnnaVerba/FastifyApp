import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import { replayKey } from '../shared/consts';

const trueOrFalse = true;
async function connect() {
  const amqpServer = 'amqp://localhost:5672';
  const connection = await amqplib.connect(amqpServer);
  const channel = await connection.createChannel();
  const queue = 'hello';
  await channel.assertExchange('exchange1', 'topic', {
    durable: trueOrFalse,
  });
  await channel.assertQueue(queue, {
    durable: trueOrFalse,
  });
  await channel.assertQueue('replay', {
    durable: trueOrFalse,
  });
  await channel.bindQueue(queue, 'exchange1', 'user.info');
  try {
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    await channel.consume(queue, message, {
      noAck: trueOrFalse,
    });
  } catch (error) {
    console.log(error);
  }
  function message(msg: any) {
    logger.info(' [x] Received %s' + msg.content.toString());
    channel.publish(
      'exchange1',
      replayKey,
      Buffer.from(msg.content.toString()),
    );
  }
}

connect();
