import amqp from 'amqplib/callback_api';

import express from 'express';

const app = express();
amqp.connect('amqp://localhost:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'hello';
        channel.assertExchange('exchange1', 'topic', {
            durable: true,
        });

        channel.assertQueue(queue, {
            durable: true,
        });
        channel.assertQueue('replay', {
            durable: true,
        });

        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

        channel.bindQueue(queue, 'exchange1', 'user.info');

        channel.consume(
            queue,
            function (msg) {
                console.log(' [x] Received %s', msg.content.toString());
                channel.publish(
                    'exchange1',
                    'replay',
                    Buffer.from(msg.content.toString()),
                );
            },
            {
                noAck: true,
            },
        );
    });
});

module.exports = app;

