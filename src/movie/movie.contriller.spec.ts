import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './models/movie.model';
import { Sequelize } from 'sequelize-typescript';

// import { SequelizeModule } from '@nestjs/sequelize';
describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  let sequelize: Sequelize;

  beforeEach(async () => {
    movieService = new MovieService(Movie, sequelize);
    movieController = new MovieController(movieService);
  });

  describe('findAll', () => {
    it('/GET :search/:value', async () => {
      expect(await movieService.searchByAll('time', '12334')).toEqual('{}');
    });
    it('type test', async () => {
      expect(typeof (await movieController.search)).toBe('function');
    });
    it('type test', async () => {
      expect(typeof (await movieController.search)).toEqual('string');
    });
    it('db dont have such value', async () => {
      expect(await movieController.search('time/4')).toBeUndefined();
    });
    it('time must be a number', async () => {
      expect(await movieController.search('time/time')).toThrowError();
    });
    it('function must be called', async () => {
      const result = jest.fn().mockResolvedValue([
        {
          id: 1,
          time: '4',
          name: 'adsf',
          rating: '7',
          createdat: '2022-10-17',
          updatedat: '2022-10-17',
        },
      ]);
      // jest.spyOn(movieService, 'searchByAll').mockImplementation(() => result);

      expect(await movieController.search('time/4')).toEqual(result);
    });
    it('time', async () => {
      // jest.spyOn(movieService, 'searchByAll').mockImplementation(() => result);
      //
      expect(await movieController.search('time/4')).toThrowError();
    });
  });
});
