import { Model } from 'sequelize-typescript';
export declare class Movie extends Model {
    id: number;
    time: string;
    name: string;
    rating: number;
    createdat: 'created_date';
    updatedat: 'updated_at';
}
