"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const Logger_1 = __importDefault(require("../winstonLogger/Logger"));
const consts_1 = require("../shared/consts");
const durableIsTrue = true;
const hardTestQueue = 'hardTest';
const amqpServer = 'amqp://localhost:5672';
const queue = 'hello';
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqplib_1.default.connect(amqpServer);
        const channel = yield connection.createChannel();
        yield channel.assertExchange('exchange1', 'topic', {
            durable: durableIsTrue,
        });
        yield channel.assertQueue(queue, {
            durable: durableIsTrue,
        });
        yield channel.assertQueue('replay', {
            durable: durableIsTrue,
        });
        yield channel.bindQueue(queue, 'exchange1', 'user.info');
        function publisher(msg) {
            Logger_1.default.info(' [x] Received %s' + msg.content.toString());
            channel.publish('exchange1', consts_1.replayKey, Buffer.from(msg.content.toString()));
        }
        let consumedMessages = 0;
        try {
            console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
            yield channel.consume(hardTestQueue, (msg) => {
                const timestamp = new Date().toLocaleTimeString();
                consumedMessages++;
                if (msg != null)
                    Logger_1.default.info(`consumed ${consumedMessages}: ${timestamp}-${msg.content.toString()}`);
            }, { noAck: true });
            yield channel.consume(queue, publisher, {
                noAck: true,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
connect();
