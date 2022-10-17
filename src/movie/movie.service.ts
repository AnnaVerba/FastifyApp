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
    console.log('eroor', value);
    // const queryForBd = 'SELECT * FROM movies WHERE ' + search + '=?';
    // await Sequelize.query(queryForBd, [value]);
    return this.movie.findAll({
      where: this.sequelize.where(this.sequelize.col(`${search}`), value),
    });
  }
}
