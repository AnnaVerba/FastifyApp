import { MovieService } from './movie.service';
import { Movie } from './models/movie.model';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    createMovie(body: any): Promise<Movie>;
    updateMovie(body: any, id: number): Promise<any>;
    deleteMovie(id: number): Promise<any>;
    getMovieById(id: number): Promise<Movie>;
    search(params: any): Promise<Movie[]>;
    getMovies(): Promise<Movie[]>;
}
