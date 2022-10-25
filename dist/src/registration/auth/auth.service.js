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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const util = require("node:util");
const crypto = require("node:crypto");
const user_service_1 = require("../user.service");
const User_dto_1 = require("../model/dto/User.dto");
const email_service_1 = require("../email.service");
const encryptIterations = 50000;
const encryptKeyLength = 64;
const encryptDigest = 'sha512';
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, emailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async registration(dto) {
        dto.password = await AuthService_1.encryptPassword(dto.password);
        const user = await this.userService.create(dto);
        if (user.emailconfirmed === true) {
            await this.sendlink(user.email);
        }
        this.signToken(user);
        return User_dto_1.UserDto.mapFrom(user);
    }
    async sendlink(email) {
        const url = `${process.env.EMAIL_CONFIRMATION_URL}/${email}`;
        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
        return await this.emailService.sendMail({
            to: email,
            subject: 'Email confirmation',
            text,
        });
    }
    async login(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!(user.emailconfirmed === true)) {
            throw new common_1.UnauthorizedException('Your email is not confirmed');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Incorrect password or email');
        }
        if (!(await AuthService_1.checkPassword(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Incorrect password or email');
        }
        return User_dto_1.UserDto.mapFrom(user);
    }
    signToken(user) {
        const payload = {
            sub: user.email,
        };
        return this.jwtService.sign(payload);
    }
    static async encryptPassword(plainPassword) {
        const salt = crypto.randomBytes(16).toString('hex');
        const crypt = util.promisify(crypto.pbkdf2);
        const encryptedPassword = await crypt(plainPassword, salt, encryptIterations, encryptKeyLength, encryptDigest);
        return salt + ':' + encryptedPassword.toString('hex');
    }
    static async checkPassword(password, existPassword) {
        const [salt, key] = existPassword.split(':');
        const crypt = util.promisify(crypto.pbkdf2);
        const encryptedPassword = await crypt(password, salt, encryptIterations, encryptKeyLength, encryptDigest);
        return key === encryptedPassword.toString('hex');
    }
    async regenerateTokens(request) {
        const tokenData = await this.jwtService.decode(request.headers.authorization.split(' ')[1]);
        const user = await this.userService.findByEmail(tokenData.sub);
        return User_dto_1.UserDto.mapFrom(user);
    }
    async confirm(email) {
        return await this.userService.confirm(email);
    }
    async getJwtToken(user) {
        const payload = Object.assign({}, user);
        return this.jwtService.signAsync(payload);
    }
    async getRefreshToken(id) {
        const userDataToUpdate = {
            refreshToken: process.env.JWT_REFRESH_TOKEN_SECRET,
        };
        await this.userService.updateToken(id, userDataToUpdate.refreshToken);
        return userDataToUpdate.refreshToken;
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        email_service_1.default])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map