import { UserEntity } from '../model/user.entity';
import { LoginUserDto } from '../model/dto/LoginUser';
export declare class UserRepository {
    private readonly user;
    constructor(user: typeof UserEntity);
    create(data: LoginUserDto): Promise<UserEntity>;
    findOne(id: string): Promise<UserEntity>;
    find(): Promise<any>;
    findOneEmail(email: string): Promise<UserEntity>;
    searchByName(name: string): Promise<UserEntity[]>;
    confirm(email: string): Promise<any>;
    updateToken(id: string, refreshToken: string): Promise<void>;
    delete(email: string): Promise<void>;
    findByEmail(email: string): Promise<UserEntity>;
}
