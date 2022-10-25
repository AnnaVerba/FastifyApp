import amqplib from 'amqplib';

connect();
async function connect() {
  const amqpServer = 'amqp://localhost:5672';
  const connection = await amqplib.connect(amqpServer);
  const channel = await connection.createChannel();
  const queue = 'hello';
  await channel.assertExchange('exchange1', 'topic', {
    durable: true,
  });
  await channel.assertQueue(queue, {
    durable: true,
  });
  await channel.assertQueue('replay', {
    durable: true,
  });
  await channel.bindQueue(queue, 'exchange1', 'user.info');

  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
  try {
    await channel.consume(queue, message, {
      noAck: true,
    });
  } catch (error) {
    console.log(error);
  }
  function message(msg) {
    console.log(' [x] Received %s', msg.content.toString());
    channel.publish('exchange1', 'replay', Buffer.from(msg.content.toString()));
  }
}
