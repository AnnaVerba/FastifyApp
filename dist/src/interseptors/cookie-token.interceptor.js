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
exports.CookieTokenInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("../registration/auth/auth.service");
let CookieTokenInterceptor = class CookieTokenInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((user) => {
            const token = this.authService.getJwtToken(user);
            console.log(token);
            const refreshToken = this.authService.getRefreshToken(user.id);
            console.log(refreshToken);
            const response = context.switchToHttp().getResponse();
            console.log(user);
            response.setCookie('auth-access-cookie', 'Bearer ' + token, {
                httpOnly: true,
            });
            response.setCookie('auth-refresh-cookie', '' + refreshToken, {
                httpOnly: true,
            });
            console.log(response);
            return { msg: 'success' };
        }));
    }
};
CookieTokenInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], CookieTokenInterceptor);
exports.CookieTokenInterceptor = CookieTokenInterceptor;
//# sourceMappingURL=cookie-token.interceptor.js.map