"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const consts_1 = require("../../shared/consts");
const Logger_1 = require("../../winstonLogger/Logger");
let MessagingService = class MessagingService {
    async rpcHandler(msg, amqpMsg) {
        Logger_1.default.info('Routing key:' +
            amqpMsg.fields.routingKey +
            `\nProducer received :` +
            amqpMsg.content.toString());
        return msg;
    }
};
__decorate([
    (0, nestjs_rabbitmq_1.RabbitRPC)({
        routingKey: consts_1.replayKey,
        exchange: 'exchange1',
        queue: 'hello',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof amqplib_1.ConsumeMessage !== "undefined" && amqplib_1.ConsumeMessage) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MessagingService.prototype, "rpcHandler", null);
MessagingService = __decorate([
    (0, common_1.Injectable)()
], MessagingService);
exports.MessagingService = MessagingService;
//# sourceMappingURL=MessagingService.js.map