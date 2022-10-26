import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../modeles/registration/auth/auth.service';
import { UserEntity } from '../../modeles/registration/model/user.entity';

@Injectable()
export class CookieTokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<{ msg: string }> {
    return next.handle().pipe(
      map((user) => {
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
      }),
    );
  }
}
