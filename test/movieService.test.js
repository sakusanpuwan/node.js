// test/movieService.test.js

// STEP 1: Mock before importing anything
jest.mock('../database/knexdb.js', () => ({
  destroy: jest.fn().mockResolvedValue(), // mock destroy
}));

jest.mock('../database/Movie.js', () => ({
  query: jest.fn(),
}));

// STEP 2: Import AFTER mocks are in place
import movieService from '../test/movieService.js';
import Movie from '../database/Movie.js';
import knexdb from '../database/knexdb.js';

describe('movieService.getAllMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all movies and close the DB connection', async () => {
    const fakeMovies = [
      { MOVIE_NAME: 'Avengers' },
      { MOVIE_NAME: 'Black Panther' },
    ];

    // Mock the chained method: Movie.query().select()
    const selectMock = jest.fn().mockResolvedValue(fakeMovies);
    Movie.query.mockReturnValue({ select: selectMock });

    const result = await movieService.getAllMovies();

    expect(Movie.query).toHaveBeenCalled();
    expect(selectMock).toHaveBeenCalledWith('MOVIE_NAME');
    expect(knexdb.destroy).toHaveBeenCalled();
    expect(result).toEqual(fakeMovies);
  });
});
