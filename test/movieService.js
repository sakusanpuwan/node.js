
import knexdb from '../database/knexdb.js';
import { Model } from 'objection';
import Movie from '../database/Movie.js';

export const getAllMovies = async () => {
    Model.knex(knexdb);

    console.log("Fetching all movies...");
    const allMovies = await Movie.query().select('MOVIE_NAME');
    console.table(allMovies);
    await knexdb.destroy();
    return allMovies;
}

const movieService = {
    getAllMovies,
};

export default movieService;
