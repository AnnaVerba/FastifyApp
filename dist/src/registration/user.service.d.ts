import { UserRepository } from './repository/UserRepository';
import { UserEntity } from './model/user.entity';
import { LoginUserDto } from './model/dto/LoginUser';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    create(data: LoginUserDto): Promise<UserEntity>;
    updateToken(id: string, refreshToken: any): Promise<void>;
    confirm(email: string): Promise<string>;
}
