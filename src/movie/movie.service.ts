import { Injectable } from '@nestjs/common';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/sequelize';
//import { Op } from 'sequelize';

import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly movie: typeof Movie,
    private readonly sequelize: Sequelize,
  ) {}

  createRow(movie): Promise<Movie> {
    return this.movie.create(movie);
  }

  upDateRow(body, movie): Promise<any> {
    return this.movie.update(body, { where: { id: movie } });
  }

  deleteMovie(movie): Promise<any> {
    return this.movie.destroy({ where: { id: movie } });
  }

  getMovieById(movie): Promise<Movie> {
    return this.movie.findOne({ where: { id: movie } });
  }

  async getAllMovies(): Promise<any> {
    return this.movie.findAll();
  }

  async searchByAll(search, value): Promise<Movie[]> {
    if (!Movie.hasOwnProperty(search)) {
      throw new Error('You should provide correct field');
    }
    try {
      return this.movie.findAll({
        where: this.sequelize.where(this.sequelize.col(`${search}`), value),
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
