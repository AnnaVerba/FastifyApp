import { NestInterceptor, Type } from '@nestjs/common';
import { Options } from 'multer';
export declare function SingleFileInterceptor(fieldName: string, destination?: string): Type<NestInterceptor>;
export declare function FastifyFileInterceptor(fieldName: string, localOptions: Options): Type<NestInterceptor>;
