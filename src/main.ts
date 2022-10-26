import { NestFactory } from '@nestjs/core';
import { AppModule } from './modeles/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { contentParser } from 'fastify-multer';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';


dotenv.config({ path: './.env/.env' });
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(contentParser);
  await app.register(fastifyCookie, {
    secret: 'my-secret',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // app.use(winston);
  await app.listen(process.env.apiPort);
}
bootstrap();
