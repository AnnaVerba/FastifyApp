import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [SequelizeModule.forFeature([Movie])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
