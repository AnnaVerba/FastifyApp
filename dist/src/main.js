"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const cookie_1 = require("@fastify/cookie");
const fastify_multer_1 = require("fastify-multer");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
dotenv.config({ path: './.env/.env' });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    await app.register(fastify_multer_1.contentParser);
    await app.register(cookie_1.default, {
        secret: 'my-secret',
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.apiPort);
}
bootstrap();
//# sourceMappingURL=main.js.map