import { UserEntity } from '../user.entity';
export declare class UserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    emailToLowerCase(): void;
    static mapFrom(data: UserEntity): UserDto;
    static mapFromMulti<P>(data: UserEntity[]): UserDto[];
}
