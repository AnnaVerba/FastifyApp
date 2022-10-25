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
exports.UserRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const user_entity_1 = require("../model/user.entity");
let UserRepository = class UserRepository {
    constructor(user) {
        this.user = user;
    }
    async create(data) {
        return await this.user.create(Object.assign({}, data));
    }
    async findOne(id) {
        return await this.user.findOne({
            where: {
                id,
            },
        });
    }
    async find() {
        return await this.user.findAll();
    }
    async findOneEmail(email) {
        return await this.user.findOne({
            where: {
                email,
            },
        });
    }
    async searchByName(name) {
        return await this.user.findAll({
            where: {
                [sequelize_2.Op.or]: [
                    {
                        name: { [sequelize_2.Op.iLike]: `%${name}%` },
                    },
                ],
            },
        });
    }
    async confirm(email) {
        return await this.user.update({ emailconfirmed: true }, { where: { email: email } });
    }
    async updateToken(id, refreshToken) {
        await this.user.update({
            refreshToken,
        }, {
            where: { id },
        });
    }
    async delete(email) {
        await this.user.destroy({
            where: { email },
        });
    }
    async findByEmail(email) {
        return await this.user.findOne({
            where: {
                email,
            },
        });
    }
};
UserRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map