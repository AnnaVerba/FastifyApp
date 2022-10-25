"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const Logger_1 = require("../winstonLogger/Logger");
const consts_1 = require("../shared/consts");
const durableIsTrue = true;
const hardTestQueue = 'hardTest';
const amqpServer = 'amqp://localhost:5672';
const queue = 'hello';
async function connect() {
    const connection = await amqplib_1.default.connect(amqpServer);
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
    function publisher(msg) {
        Logger_1.default.info(' [x] Received %s' + msg.content.toString());
        channel.publish('exchange1', consts_1.replayKey, Buffer.from(msg.content.toString()));
    }
    let consumedMessages = 0;
    try {
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
        await channel.consume(hardTestQueue, (msg) => {
            const timestamp = new Date().toLocaleTimeString();
            consumedMessages++;
            if (msg != null)
                Logger_1.default.info(`consumed ${consumedMessages}: ${timestamp}-${msg.content.toString()}`);
        }, { noAck: true });
        await channel.consume(queue, publisher, {
            noAck: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}
connect();
//# sourceMappingURL=app.js.map