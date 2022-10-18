import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import * as request from 'supertest';
import { Movie } from './models/movie.model';

const moduleMocker = new ModuleMocker(global);
describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
    })
      .useMocker((token) => {
        if (token === MovieService) {
          return {
            searchByAll: jest.fn((): Promise<any> => Promise.resolve(Movie)),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();
    movieService = module.get(MovieService);
    movieController = module.get(MovieController);
  });

  it('MovieService - should be defined', () => {
    expect(movieService).toBeDefined();
  });
  it('Unreal time value', async () => {
    jest
      .spyOn(movieService, 'searchByAll')
      .mockImplementation((): Promise<any> => Promise.resolve([]));
    const received = await movieController.search('time/1243');

    expect(received).toEqual([]);
  });
  it('Search is function ', async () => {
    expect(typeof (await movieController.search)).toBe('function');
  });

  it('Function must be called', async () => {
    const serviceSpy = jest.spyOn(movieService, 'searchByAll');
    await movieController.search('time/4');
    expect(movieService.searchByAll).toHaveBeenCalled();
    await movieService.searchByAll('time', '4');
    expect(serviceSpy).toHaveBeenCalledWith('time', '4');
  });
  it('Time must be a number', async () => {
    expect(await movieController.search('time/time')).toThrowError();
  });
  it('Normal request', async () => {
    const result = [
      {
        id: 1,
        time: '4',
        name: 'adsf',
        rating: '7',
        createdat: '2022-10-17',
        updatedat: '2022-10-17',
      },
    ];
    jest
      .spyOn(movieService, 'searchByAll')
      .mockImplementation((): Promise<any> => Promise.resolve(result));
    const received = await movieController.search('time/4');
    console.log(received);
    expect(received).toEqual(result);
  });
  it('DB dont have such field', async () => {
    const received = await movieController.search('4/4');
    expect(received).toThrowError();
  });
  it('/api/movie', async () => {
    return request('localhost:8001/').get('api/movie').expect(200);
  });

  it('You must provide a values', async () => {
    const received = await movieController.search('');
    expect(received).toThrowError();
  });
  it('Should throw an error', async () => {
    jest
      .spyOn(movieService, 'searchByAll')
      .mockImplementation((): Promise<any> => Promise.resolve(undefined));
    await expect(await movieController.search).rejects.toThrow();
  });
});
