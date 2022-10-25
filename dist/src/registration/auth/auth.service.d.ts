import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { UserDto } from '../model/dto/User.dto';
import { LoginUserDto } from '../model/dto/LoginUser';
import { UserEntity } from '../model/user.entity';
import EmailService from '../email.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly emailService;
    constructor(userService: UserService, jwtService: JwtService, emailService: EmailService);
    registration(dto: LoginUserDto): Promise<UserDto>;
    sendlink(email: any): Promise<any>;
    login(dto: LoginUserDto): Promise<UserDto>;
    signToken(user: UserEntity): string;
    private static encryptPassword;
    private static checkPassword;
    regenerateTokens(request: any): Promise<UserDto>;
    confirm(email: string): Promise<string>;
    getJwtToken(user: UserEntity): Promise<string>;
    getRefreshToken(id: string): Promise<string>;
}
