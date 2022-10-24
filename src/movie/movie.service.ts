import { Injectable } from '@nestjs/common';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/sequelize';
//import { Op } from 'sequelize';

import { Sequelize } from 'sequelize-typescript';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
//import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private readonly movie: typeof Movie,
    private readonly sequelize: Sequelize,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async createRow(movie): Promise<Movie> {
    const created = await this.movie.create(movie);
    this.amqpConnection.publish('exchange1', 'user.info', {
      created,
    });
    return created;
  }

  async upDateRow(body, movie): Promise<any> {
    const created = await this.movie.update(body, { where: { id: movie } });
    this.amqpConnection.publish('exchange1', 'user.info', { created });
    return created;
  }

  async deleteMovie(movie): Promise<any> {
    const deleted = await this.movie.destroy({ where: { id: movie } });
    this.amqpConnection.publish('exchange1', 'user.info', { deleted });
    return deleted;
  }

  async getMovieById(movie): Promise<Movie> {
    const get = await this.movie.findOne({ where: { id: movie } });
    this.amqpConnection.publish('exchange1', 'user.info', { get });
    return get;
  }

  async getAllMovies(): Promise<any> {
    const movie = await this.movie.findAll();
    //this.communicationClient.emit('movies:', JSON.stringify(movie));
    this.amqpConnection.publish('exchange1', 'user.info', { movie });
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
      this.amqpConnection.publish('exchange1', 'user.info', { movie });
      return movie;
    } catch (e) {
      throw new Error(e);
    }
  }
}
