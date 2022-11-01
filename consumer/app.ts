import amqplib from 'amqplib';
import logger from '../winstonLogger/Logger';
import {exchange1, hardTestExchange, publishUserInfoKey, replayKey, testKey} from '../src/common/constants';

const isDurable = true;
const hardTestQueue = 'hardTest';
import {appConfig} from "./config/app.config";


const queue = 'hello';
const replayQueue = 'replay';
let consumedMessages = 0;
import Consul from 'consul';
import{v4} from 'uuid'
const consul = new Consul();
const id = v4().toString()

 async function register() {
    await consul.session.create()
     await consul.agent.join("127.0.0.1");
     let serviceDefinition = {
        port: 8002,
        id : `${id}`,
         kind:'Service',

        ui:
            {
                enabled: true
            },
        name: "consumer",
        tags: ['hardTest', 'movie'],
    }
     await consul.agent.service.register(serviceDefinition)
    console.log('registered with Consul');
     console.log( 'nodes: ' ,await consul.catalog.service.nodes("consumer"));
     await consul.health.checks("consumer");
     console.log('services list: ',await consul.catalog.service.list());

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

  async function SetKey(msg:any){
      msg.toString();
      try{
          await consul.kv.set("hardTest", 'hardTestStarted');
          await consul.kv.set("hardTest", msg);

      }catch (e) {

      }
  }
 function hardtest(msg: any) {
    const date = new Date();
    const timestamp = `${date.toLocaleTimeString()}:${date.getMilliseconds()}`;
    consumedMessages++;
     SetKey(msg)
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
      console.log ( await consul.kv.keys("hardTest"))
  } catch (error) {
    console.log(error);
  }

}
register()
connect();


