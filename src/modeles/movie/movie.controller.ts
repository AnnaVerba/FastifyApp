import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './models/movie.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards()
  async createMovie(@Body() body: any): Promise<Movie> {
    if (!body) {
      console.log(body.name);
      console.log(body);
      return null;
    }
    try {
      return await this.movieService.createRow(body);
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  async updateMovie(@Body() body: any, @Param('id') id: number) {
    try {
      return await this.movieService.upDateRow(body, id);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<any> {
    try {
      return await this.movieService.deleteMovie(id);
    } catch (err) {
      return err;
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards()
  async getMovieById(@Param('id') id: number): Promise<Movie> {
    try {
      return await this.movieService.getMovieById(id);
    } catch (err) {
      return err;
    }
  }

  @Get(':search/:value')
  @ApiBearerAuth()
  @UseGuards()
  async search(@Param() params): Promise<Movie[]> {
    return this.movieService.searchByAll(params.search, params.value);
  }

  @Get()
  async getMovies(): Promise<Movie[]> {
    try {
      return await this.movieService.getAllMovies();
    } catch (err) {
      return err;
    }
  }
}
