import { Movie } from './models/movie.model';
import { Sequelize } from 'sequelize-typescript';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
export declare class MovieService {
    private readonly movie;
    private readonly sequelize;
    private readonly amqpConnection;
    constructor(movie: typeof Movie, sequelize: Sequelize, amqpConnection: AmqpConnection);
    createRow(movie: any): Promise<Movie>;
    upDateRow(body: any, movie: any): Promise<any>;
    deleteMovie(movie: any): Promise<any>;
    getMovieById(movie: any): Promise<Movie>;
    getAllMovies(): Promise<any>;
    hardTest(): Promise<string>;
    searchByAll(search: any, value: any): Promise<Movie[]>;
}
