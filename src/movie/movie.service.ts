import { Injectable } from '@nestjs/common';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly MovieModel: typeof Movie,
  ) {}

  createRow(movie): Promise<Movie> {
    return this.MovieModel.create(movie);
  }

  upDateRow(body, movie): Promise<any> {
    return this.MovieModel.update(body, { where: { id: movie } });
  }

  deleteMovie(movie): Promise<any> {
    return this.MovieModel.destroy({ where: { id: movie } });
  }

  getMovieById(movie): Promise<Movie> {
    return this.MovieModel.findOne({ where: { id: movie } });
  }

  async getAllMovies(): Promise<any> {
    return this.MovieModel.findAll();
  }
}
