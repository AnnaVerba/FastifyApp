import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/sequelize';
//import { Op } from 'sequelize';

import { Sequelize } from 'sequelize-typescript';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly movie: typeof Movie,
    private readonly sequelize: Sequelize,
    @Inject('Communication')
    private readonly communicationClient: ClientProxy,
  ) {}

  async createRow(movie): Promise<Movie> {
    const created = await this.movie.create(movie);
    this.communicationClient.emit('movie created', created);

    return created;
  }

  async upDateRow(body, movie): Promise<any> {
    const created = await this.movie.update(body, { where: { id: movie } });
    // this.communicationClient.emit('movie updated to:', movie);
    return created;
  }

  async deleteMovie(movie): Promise<any> {
    const deleted = await this.movie.destroy({ where: { id: movie } });
    // this.communicationClient.emit('movie deleted:', deleted);
    return deleted;
  }

  async getMovieById(movie): Promise<Movie> {
    const get = await this.movie.findOne({ where: { id: movie } });
    // this.communicationClient.emit('received movie:', get);
    return get;
  }

  async getAllMovies(): Promise<any> {
    const movie = await this.movie.findAll();
    //this.communicationClient.emit('movies:', JSON.stringify(movie));

    return movie;
  }

  async searchByAll(search, value): Promise<Movie[]> {
    if (!Movie.hasOwnProperty(search)) {
      throw new Error('You should provide correct field');
    }
    try {
      const movie = await this.movie.findAll({
        where: this.sequelize.where(this.sequelize.col(`${search}`), value),
      });
      // this.communicationClient.emit('search complete:', movie);
      return movie;
    } catch (e) {
      throw new Error(e);
    }
  }
}
