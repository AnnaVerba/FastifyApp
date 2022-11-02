import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import {exchange1, hardTestExchange, publishUserInfoKey, replayKey, testKey} from '../src/common/constants';
import {appConfig} from "./config/app.config";
import Consul from 'consul';
import{v4} from 'uuid'
let consumedMessages = 0;
const isDurable = true;
const hardTestQueue = 'hardTest';
const queue = 'hello';
const replayQueue = 'replay';

const consul = new Consul();
const id = v4().toString()

 async function register() {
    await consul.session.create()
     await consul.agent.join("127.0.0.1");
     let serviceDefinition = {
        port: 8002,
        id : `${id}`,
         kind:'Service',
        name: "consumer",
        tags: ['hardTest', 'movie'],
    }
     await consul.agent.service.register(serviceDefinition)
    console.log('registered with Consul');

await serviceInfo('consumer')
}
async function serviceInfo(service) {
    logger.info('Producer service info:%s');
    const nodes=await consul.catalog.service.nodes("produser");
    logger.info( `nodes : ${JSON.stringify(nodes)}` );
    const health=await consul.health.service("produser")
    logger.info( `health : ${JSON.stringify(health)}` );

}
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

  async function hardTest(msg: any) {

    const date = new Date();
    const timestamp = `${date.toLocaleTimeString()}:${date.getMilliseconds()}`;
    consumedMessages++;
      const kv=await consul.kv.get(consumedMessages.toString());
    const content=msg.content.toString();
     logger.info(
         `Number of consumed: ${consumedMessages} consumed at: ${timestamp} message(published at): ${content}`,
     );

      logger.info(`get kv:
      ${
          JSON.stringify(kv)
      }`)
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
register();
serviceInfo('produser');
connect();


