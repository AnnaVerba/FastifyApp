import { ConsumeMessage } from 'amqplib';
export declare class MessagingService {
    rpcHandler(msg: any, amqpMsg: ConsumeMessage): Promise<any>;
}
