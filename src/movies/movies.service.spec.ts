import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2021,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      const movieId = 999;
      try {
        service.getOne(movieId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Moview with ID: ${movieId} not found.`);
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a move', () => {
      service.create({
        title: 'Test Movie',
        year: 2021,
        genres: ['test'],
      });
      const allMovies = service.getAll();
      service.deleteOne(allMovies[0].id);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(allMovies.length - 1);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('should create a movie', () => {
      const prevMovies = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2021,
        genres: ['test'],
      });
      const nextMovies = service.getAll().length;
      expect(nextMovies).toBeGreaterThan(prevMovies);
    });
  });
});
