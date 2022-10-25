"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const app_config_1 = require("../config/app.config");
const user_entity_1 = require("../model/user.entity");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("../strategy/jwt.strategy");
const user_service_1 = require("../user.service");
const UserRepository_1 = require("../repository/UserRepository");
const email_service_1 = require("../email.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([user_entity_1.UserEntity]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: app_config_1.appConfig.getAppSecret(),
                signOptions: {
                    expiresIn: app_config_1.appConfig.getJwtExpired(),
                    algorithm: 'HS384',
                },
                verifyOptions: {
                    algorithms: ['HS384'],
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            config_1.ConfigService,
            jwt_strategy_1.JwtStrategy,
            user_service_1.UserService,
            UserRepository_1.UserRepository,
            email_service_1.default,
            app_config_1.AppConfig,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map