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
exports.FastifyFileInterceptor = exports.SingleFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const fastify_multer_1 = require("fastify-multer");
const multer_1 = require("multer");
const edit_1 = require("../upload/edit");
function SingleFileInterceptor(fieldName, destination) {
    return FastifyFileInterceptor(fieldName, {
        storage: (0, multer_1.diskStorage)({
            destination: `${destination}`,
            filename: edit_1.editFileName,
        }),
        fileFilter: edit_1.imageFileFilter,
    });
}
exports.SingleFileInterceptor = SingleFileInterceptor;
function FastifyFileInterceptor(fieldName, localOptions) {
    let MixinInterceptor = class MixinInterceptor {
        constructor(options) {
            this.multer = fastify_multer_1.default(Object.assign(Object.assign({}, options), localOptions));
        }
        async intercept(context, next) {
            const ctx = context.switchToHttp();
            try {
                await new Promise((resolve, reject) => {
                    const single = this.multer.single(fieldName);
                    return single(ctx.getRequest(), ctx.getResponse(), (error) => {
                        if (!error) {
                            console.log('fieldName', fieldName);
                            resolve();
                        }
                        return reject(error);
                    });
                });
            }
            catch (e) {
                console.log('error:', e);
            }
            return next.handle();
        }
    };
    MixinInterceptor = __decorate([
        __param(0, (0, common_1.Optional)()),
        __param(0, (0, common_1.Inject)('MULTER_MODULE_OPTIONS')),
        __metadata("design:paramtypes", [Object])
    ], MixinInterceptor);
    const Interceptor = (0, common_1.mixin)(MixinInterceptor);
    return Interceptor;
}
exports.FastifyFileInterceptor = FastifyFileInterceptor;
//# sourceMappingURL=SingleFileInterseptor.js.map