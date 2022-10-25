import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import { replayKey } from '../shared/consts';

const durableIsTrue = true;
async function connect() {
  const amqpServer = 'amqp://localhost:5672';
  const connection = await amqplib.connect(amqpServer);
  const channel = await connection.createChannel();
  const queue = 'hello';
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
  try {
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    await channel.consume(queue, publisher, {
      noAck: durableIsTrue,
    });
  } catch (error) {
    console.log(error);
  }
  function publisher(msg: any) {
    logger.info(' [x] Received %s' + msg.content.toString());
    channel.publish(
      'exchange1',
      replayKey,
      Buffer.from(msg.content.toString()),
    );
  }
}

connect();
