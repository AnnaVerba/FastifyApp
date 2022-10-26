import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({ dest: './files' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './files'),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
