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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const swagger_1 = require("@nestjs/swagger");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async createMovie(body) {
        if (!body) {
            console.log(body.name);
            console.log(body);
            return null;
        }
        try {
            return await this.movieService.createRow(body);
        }
        catch (e) {
            return e;
        }
    }
    async updateMovie(body, id) {
        try {
            return await this.movieService.upDateRow(body, id);
        }
        catch (err) {
            return err;
        }
    }
    async deleteMovie(id) {
        try {
            return await this.movieService.deleteMovie(id);
        }
        catch (err) {
            return err;
        }
    }
    async getMovieById(id) {
        try {
            return await this.movieService.getMovieById(id);
        }
        catch (err) {
            return err;
        }
    }
    async search(params) {
        return await this.movieService.searchByAll(params.search, params.value);
    }
    async getMovies() {
        try {
            return await this.movieService.getAllMovies();
        }
        catch (err) {
            return err;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "updateMovie", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieById", null);
__decorate([
    (0, common_1.Get)(':search/:value'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovies", null);
MovieController = __decorate([
    (0, common_1.Controller)('movie'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map