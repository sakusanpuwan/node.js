import Movie from '../database/Movie.js';

export const getAllMovies = async () => {
    // Model.knex(knexdb); should only be binded once preferrably in the main entry point of the application

    console.log("Fetching all movies...");
    const allMovies = await Movie.query().select('MOVIE_NAME');
    console.table(allMovies);
    return allMovies;
}

const movieService = {
    getAllMovies,
};

export default movieService;
