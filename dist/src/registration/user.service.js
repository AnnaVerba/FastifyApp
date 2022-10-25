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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("./repository/UserRepository");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`There isn't any user with id: ${id}`);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        console.log(user);
        return user;
    }
    async create(data) {
        const userEmailCheck = await this.findByEmail(data.email);
        if (userEmailCheck) {
            throw new common_1.ConflictException(`Error create new user`);
        }
        return this.userRepository.create(data);
    }
    async updateToken(id, refreshToken) {
        await this.userRepository.updateToken(id, refreshToken);
    }
    async confirm(email) {
        return this.userRepository.confirm(email);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map