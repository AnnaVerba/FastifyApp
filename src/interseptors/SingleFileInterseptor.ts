import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
  Optional,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer, diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../upload/edit';

export function SingleFileInterceptor(
  fieldName: string,
  destination?: string,
): Type<NestInterceptor> {
  return FastifyFileInterceptor(fieldName, {
    storage: diskStorage({
      destination: `${destination}`,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  });
}

type MulterInstance = any;
export function FastifyFileInterceptor(
  fieldName: string,
  localOptions: Options,
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;

    constructor(
      @Optional()
      @Inject('MULTER_MODULE_OPTIONS')
      options: Multer,
    ) {
      this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      try {
        await new Promise<void>((resolve, reject) => {
          const single = this.multer.single(fieldName);
          return single(ctx.getRequest(), ctx.getResponse(), (error: any) => {
            if (!error) {
              console.log('fieldName', fieldName);
              resolve();
            }
            return reject(error);
          });
        });
      } catch (e) {
        console.log('error:', e);
      }
      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
