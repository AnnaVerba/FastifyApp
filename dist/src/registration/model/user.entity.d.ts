import { Model } from 'sequelize-typescript';
export declare class UserEntity extends Model {
    id: string;
    name: string;
    email: string;
    password: string;
    changedpassword: boolean;
    emailconfirmed: boolean;
    refreshtoken: string;
    createdat: 'created_date';
    updatedat: 'updated_at';
}
