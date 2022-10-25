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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const movie_model_1 = require("./models/movie.model");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let MovieService = class MovieService {
    constructor(movie, sequelize, amqpConnection) {
        this.movie = movie;
        this.sequelize = sequelize;
        this.amqpConnection = amqpConnection;
    }
    async createRow(movie) {
        const created = await this.movie.create(movie);
        this.amqpConnection.publish('exchange1', 'user.info', {
            created,
        });
        return created;
    }
    async upDateRow(body, movie) {
        const created = await this.movie.update(body, { where: { id: movie } });
        this.amqpConnection.publish('exchange1', 'user.info', { created });
        return created;
    }
    async deleteMovie(movie) {
        const deleted = await this.movie.destroy({ where: { id: movie } });
        this.amqpConnection.publish('exchange1', 'user.info', { deleted });
        return deleted;
    }
    async getMovieById(movie) {
        const get = await this.movie.findOne({ where: { id: movie } });
        this.amqpConnection.publish('exchange1', 'user.info', { get });
        return get;
    }
    async getAllMovies() {
        const movie = await this.movie.findAll();
        this.amqpConnection.publish('exchange1', 'user.info', { movie });
        return movie;
    }
    async searchByAll(search, value) {
        if (!movie_model_1.Movie.hasOwnProperty(search)) {
            throw new Error('You should provide correct field');
        }
        try {
            const movie = await this.movie.findAll({
                where: this.sequelize.where(this.sequelize.col(`${search}`), value),
            });
            this.amqpConnection.publish('exchange1', 'user.info', { movie });
            return movie;
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(movie_model_1.Movie)),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        nestjs_rabbitmq_1.AmqpConnection])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map