import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import {exchange1, hardTestExchange, publishUserInfoKey, replayKey, testKey} from '../src/common/constants';
import {appConfig} from "./config/app.config";
import Consul from 'consul';

let consumedMessages = 0;
const isDurable = true;
const hardTestQueue = 'hardTest';
const queue = 'hello';
const replayQueue = 'replay';

const consul = new Consul();

async function serviceInfo(service) {
    logger.info(`service info:%s ${service}`);
    const nodes=await consul.catalog.service.nodes(service);
    logger.info( `nodes : ${JSON.stringify(nodes)}` );
    const health=await consul.health.service(service)
    logger.info( `health : ${JSON.stringify(health)}` );

}
async function connect() {
   await serviceInfo('produser');
   await serviceInfo('consumer')
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

  async function hardTest(msg: any) {

    const date = new Date();
    const timestamp = `${date.toLocaleTimeString()}:${date.getMilliseconds()}`;
    consumedMessages++;
      const kv=await consul.kv.get(consumedMessages.toString());
    const content=msg.content.toString();
     logger.info(
         `Number of consumed: ${consumedMessages} consumed at: ${timestamp} message(published at): ${content}`,
     );
      logger.info(`get kv: ${JSON.stringify(kv)}`)
      await consul.kv.set("hardTestFinished", content);
  }
  try {
    console.log(' [*] Waiting for messages in queues. To exit press CTRL+C', queue);
    await channel.consume(hardTestQueue, hardTest, { noAck: true });
    await channel.consume(queue, publisher, {
      noAck: true,
    });
  } catch (error) {
    console.log(error);
  }

}

connect();


