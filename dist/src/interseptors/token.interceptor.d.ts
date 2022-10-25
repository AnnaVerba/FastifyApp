import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../registration/auth/auth.service';
import { UserEntity } from '../registration/model/user.entity';
export declare class TokenInterceptor implements NestInterceptor {
    private readonly authService;
    constructor(authService: AuthService);
    intercept(context: ExecutionContext, next: CallHandler<UserEntity>): Observable<UserEntity>;
}
