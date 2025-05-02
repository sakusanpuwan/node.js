import oracledb from './oracledb.js';
import knexdb from './knexdb.js';
import { Model } from 'objection';
import filmService from './filmService.js';
import Movie from './Movie.js';
import Film from './Film.js';
import dotenv from 'dotenv';

// ORACLE DB EXAMPLE
// ==================

// Initialize Oracle DB connection
await oracledb.initialiseDatabaseConnection();

// READ: Fetch all rows from the FILMS table
console.log("Fetching all films from Oracle DB...");
const filmData = await oracledb.getRows('FILMS');
console.table(filmData);

// Access the second film's name
const secondFilmName = filmData[1][1];
console.log(`The second film name is ${secondFilmName}`);

// READ: Fetch filtered rows from the FILMS table
console.log("Fetching films with duration > 120...");
const filteredFilmData = await oracledb.getRows('FILMS', 'DURATION > 120');
console.table(filteredFilmData);

// CREATE: Insert a new film into the FILMS table
console.log("Inserting a new film into Oracle DB...");
const newFilm = {
    "TITLE": "The Nice Guys",
    "DURATION": 145,
    "RATING": "12A"
};
const insertResult = await oracledb.insertRow('FILMS', newFilm);

// DELETE: Remove the inserted film from the FILMS table
console.log("Deleting the inserted film...");
const deleteResult = await oracledb.deleteRows('FILMS', "TITLE = 'The Nice Guys'");

// Close Oracle DB connection
await oracledb.closeDatabaseConnection();

// KNEX DB EXAMPLE
// ==================

// Initialize Knex + Objection.js
console.log("Knex DB Example");
Model.knex(knexdb); // Bind the Knex instance to Objection.js
const result = dotenv.config({path: '../.env'}); // Load environment variables from .env file
if (result.error) {
  console.error("⚠️ Could not load .env file", result.error);
}
console.log(knexdb.client.config.client);
console.log('NODE_ENV:', process.env.NODE_ENV);

// READ: Fetch all films using Objection.js
console.log("Fetching all films using Knex + Objection.js...");
let allFilms = await filmService.getAllFilms();
console.table(allFilms);

// READ: Fetch films by condition
console.log("Fetching films with TITLE = 'Guardians of the Galaxy'...");
const filmsByCondition = await filmService.getFilmsByCondition({ TITLE: "Guardians of the Galaxy" });
console.table(filmsByCondition);

// READ: Fetch a single film by condition
console.log("Fetching a single film with TITLE = 'You Only Live Twice'...");
const film = await filmService.getOneFilmByCondition({ TITLE: "You Only Live Twice" });
console.log(`The film is ${film.TITLE}`);

// UPDATE: Update a film's rating
if (film) {
    console.log("Updating the film's rating...");
    const updatedFilm = await filmService.updateFilm(film.ID, { RATING: "18" });
    console.log(`Updated film: ${updatedFilm.TITLE} with new rating: ${updatedFilm.RATING}`);
}

// READ: Fetch all films again to confirm updates
allFilms = await filmService.getAllFilms();
console.table(allFilms);

// CREATE: Insert multiple films
console.log("Inserting multiple films...");
const newFilms = [
    {
        TITLE: "21 Jump Street",
        DURATION: 109,
        RATING: "12A"
    },
    {
        TITLE: "John Wick",
        DURATION: 132,
        RATING: "18"
    }
];
await filmService.createFilm(newFilms);

// CREATE: Insert a single film
console.log("Inserting a single film...");
const newKnexFilm = {
    TITLE: "The Nice Guys",
    DURATION: 145,
    RATING: "12A"
};
await filmService.createFilm(newKnexFilm);

// READ: Fetch all films again to confirm inserts
console.table(await filmService.getAllFilms());

// UPDATE: Update a film by ID
console.log("Updating a film by ID...");
const updatedFilm = await Film.query()
    .patchAndFetchById(1, { TITLE: "Guardians of the Galaxy 2" });
console.log(`Updated film: ${updatedFilm.TITLE} with new rating: ${updatedFilm.RATING}`);

// UPDATE: Update films by condition
console.log("Updating films with TITLE = '21 Jump Street'...");
const updatedFilms = await Film.query()
    .patch({ TITLE: "22 Jump Street" })
    .where('TITLE', "21 Jump Street");

// UPDATE: Update a film object and commit changes
console.log("Updating a film object and committing changes...");
const filmObject = await Film.query().findOne({ TITLE: "You Only Live Twice" });
const updatedFilmObject = filmObject.toJSON(); // Convert to JSON object
updatedFilmObject.RATING = "15";
updatedFilmObject.DURATION = 120;
delete updatedFilmObject.ID; // Remove ID to avoid conflict with primary key
await filmObject.$query().patch(updatedFilmObject);

// DELETE: Delete films by condition
console.log("Deleting films with TITLE = '22 Jump Street' or 'John Wick'...");
await Film.query().delete().where('TITLE', "22 Jump Street").orWhere('TITLE', "John Wick");

// MOVIE QUERIES
// ==================

// READ: Fetch all movies
console.log("Fetching all movies...");
const allMovies = await Movie.query().select('MOVIE_NAME');
console.table(allMovies);

// READ: Fetch a single movie by condition
console.log("Fetching a single movie with MOVIE_NAME = 'Iron Man 3'...");
const ironMan3 = await Movie.query().findOne({ MOVIE_NAME: "Iron Man 3" });
console.log(`Iron Man 3 is ${ironMan3.MOVIE_NAME}`);

// READ: Fetch movies with a pattern
console.log("Fetching movies with 'Avengers' in their name...");
const avengersFilms = await Movie.query().where('MOVIE_NAME', 'like', '%Avengers%').select('MOVIE_NAME');
console.table(avengersFilms);

// READ: Fetch a movie by director and release date
console.log("Fetching 'Guardians of the Galaxy 2' by director and release date...");
const secondGuardians = await Movie.query()
    .where('DIRECTOR', 'James Gunn')
    .andWhereRaw(`RELEASE_DATE = TO_DATE('2017-05-05', 'YYYY-MM-DD')`)
    .select('MOVIE_NAME')
    .first();
console.log(`Guardians of the galaxy 2 is ${secondGuardians.MOVIE_NAME}`);

// READ: Fetch short movies in phase 3
console.log("Fetching short movies in phase 3...");
const shortThirdPhase = await Movie.query()
    .where('MOVIE_DURATION', '<', 130)
    .andWhere('PHASE_ID', 3)
    .select('MOVIE_NAME');
console.table(shortThirdPhase);

// READ: Fetch short and long movies
console.log("Fetching short and long movies...");
const shortAndLong = await Movie.query()
    .where('MOVIE_DURATION', '<', 120)
    .orWhere('MOVIE_DURATION', '>', 170)
    .orderBy('MOVIE_DURATION', 'desc')
    .select('MOVIE_NAME');
console.table(shortAndLong);

// READ: Count movies in the database
console.log("Counting movies in the database...");
const count = await Movie.query().resultSize();
console.log(`There are ${count} movies in the database`);

// READ: Fetch movies with high public response
console.log("Fetching movies with a public response TOMATO_METER > 80...");
const moviesWithReviews = await Movie.query()
    .join('PUBLIC_RESPONSE', 'MOVIES.MOVIE_ID', 'PUBLIC_RESPONSE.MOVIE_ID')
    .select('MOVIES.MOVIE_NAME', 'PUBLIC_RESPONSE.TOMATO_METER')
    .where('PUBLIC_RESPONSE.TOMATO_METER', '>', 80)
    .orderBy('PUBLIC_RESPONSE.TOMATO_METER', 'desc');
console.table(moviesWithReviews);

// READ: Fetch a movie with its characters
console.log("Fetching a movie with its characters...");
const movieWithCharacters = await Movie.query()
    .findById(1)
    .withGraphFetched('characters');
console.log(movieWithCharacters);

// READ: Fetch a movie with only character names
console.log("Fetching a movie with only character names...");
const movieWithCharactersJustName = await Movie.query()
    .findById(1)
    .withGraphFetched('characters')
    .modifyGraph('characters', (builder) => {
        builder.select('CHARACTER_NAME');
    });
console.log(movieWithCharactersJustName);

// Close Knex connection pool
knexdb.destroy();
