"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MovieModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const movie_model_1 = require("./models/movie.model");
const movie_service_1 = require("./movie.service");
const movie_controller_1 = require("./movie.controller");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const MessagingService_1 = require("./MessagingService");
let MovieModule = MovieModule_1 = class MovieModule {
};
MovieModule = MovieModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([movie_model_1.Movie]),
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
                exchanges: [
                    {
                        name: 'exchange1',
                        type: 'topic',
                    },
                    {
                        name: 'hardTestExchange',
                        type: 'topic',
                    },
                ],
                uri: 'amqp://localhost:5672',
            }),
            MovieModule_1,
        ],
        providers: [movie_service_1.MovieService, MessagingService_1.MessagingService, movie_controller_1.MovieController],
        controllers: [movie_controller_1.MovieController],
    })
], MovieModule);
exports.MovieModule = MovieModule;
//# sourceMappingURL=movie.module.js.map