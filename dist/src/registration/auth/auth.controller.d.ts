import { AuthService } from './auth.service';
import { UserDto } from '../model/dto/User.dto';
import { LoginUserDto } from '../model/dto/LoginUser';
import { FastifyReply } from 'fastify';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(LoginDto: LoginUserDto): Promise<UserDto>;
    login(loginDto: LoginUserDto): Promise<UserDto>;
    refresh(request: any, response: FastifyReply): Promise<UserDto>;
    confirm(query: any): Promise<string>;
}
