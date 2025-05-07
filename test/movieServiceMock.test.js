// test/movieService.test.js

// STEP 1: Mock before importing anything
jest.mock('../database/Movie.js', () => ({ // mocks the Movie model
  query: jest.fn(), // mock query function
}));

// STEP 2: Import AFTER mocks are in place
import {getAllMovies} from './movieService.js';
import Movie from '../database/Movie.js';

describe('movieService.getAllMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all movies', async () => {
    const fakeMovies = [
      { MOVIE_NAME: 'Avengers' },
      { MOVIE_NAME: 'Black Panther' },
    ];

    // Mock the chained method: Movie.query().select()
    const selectMock = jest.fn().mockResolvedValue(fakeMovies);
    Movie.query.mockReturnValue({ select: selectMock }); // Movie.query().select('MOVIE_NAME') === mockMovies; 

    const result = await getAllMovies();

    expect(Movie.query).toHaveBeenCalled();
    expect(selectMock).toHaveBeenCalledWith('MOVIE_NAME');
    expect(result).toEqual(fakeMovies);
  });
});
