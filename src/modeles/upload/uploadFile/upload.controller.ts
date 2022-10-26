import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { Express } from 'express';
import { SingleFileInterceptor } from '../../../shared/interseptors/SingleFileInterseptor';

@Controller('upload')
export class UploadController {
  //constructor() {}

  @Post()
  @UseInterceptors(SingleFileInterceptor('file', './files'))
  public async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
