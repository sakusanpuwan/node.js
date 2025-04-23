import oracledb from './oracledb.js';
import knexdb from './knexdb.js';
import { Model } from 'objection';
import filmService from './filmService.js';
import Movie from './Movie.js';


// ORACLE DB EXAMPLE

await oracledb.initialiseDatabaseConnection();
// READ
const filmData = await oracledb.getRows('FILMS');

console.table(filmData);
const secondFilmName = filmData[1][1];
console.log(`The second film name is ${secondFilmName}`);

const filteredFilmData = await oracledb.getRows('FILMS', 'DURATION > 120');
console.table(filteredFilmData);

// CREATE
const newFilm = {
    "TITLE" : "The Nice Guys",
    "DURATION" : 145,
    "RATING" : "12A"
};
const insertResult = await oracledb.insertRow('FILMS', newFilm);

// DELETE
const deleteResult = await oracledb.deleteRows('FILMS', "TITLE = 'The Nice Guys'");

await oracledb.closeDatabaseConnection();

// KNEX DB EXAMPLE
console.log("Knex DB Example");

// Knex + Objection.js example

Model.knex(knexdb); // Bind the Knex instance to Objection.js
let allFilms = await filmService.getAllFilms();
console.table(allFilms);

const filmsByCondition = await filmService.getFilmsByCondition({ TITLE: "Guardians of the Galaxy" });
console.table(filmsByCondition);

const film = await filmService.getOneFilmByCondition({ TITLE: "You Only Live Twice" });
console.log(`The film is ${film.TITLE}`);

if (film) {
    const updatedFilm = await filmService.updateFilm(film.ID, { RATING: "18" });
    console.log(`Updated film: ${updatedFilm.TITLE} with new rating: ${updatedFilm.RATING}`);
}
allFilms = await filmService.getAllFilms();
console.table(allFilms);

const newFilms = [
    {
        TITLE : "21 Jump Street",
        DURATION : 109,
        RATING : "12A"
    },
    {
        TITLE : "John Wick",
        DURATION : 132,
        RATING : "18"
    }
]

const newKnexFilm = {
    TITLE : "The Nice Guys",
    DURATION : 145,
    RATING : "12A"
}
await filmService.createFilm(newFilms);
await filmService.createFilm(newKnexFilm);
console.table(await filmService.getAllFilms());

// might be easier to build SQL queries directly here or abstract in entity specific files

const allMovies = await Movie.query().select('MOVIE_NAME');
console.table(allMovies);

const ironMan3 = await Movie.query().findOne({ MOVIE_NAME: "Iron Man 3" });
console.log(`Iron Man 3 is ${ironMan3.MOVIE_NAME}`);

const avengersFilms = await Movie.query().where('MOVIE_NAME', 'like', '%Avengers%').select('MOVIE_NAME');
console.table(avengersFilms);

const secondGuardians = await Movie.query()
    .where('DIRECTOR','James Gunn')
    .andWhereRaw(`RELEASE_DATE = TO_DATE('2017-05-05', 'YYYY-MM-DD')`)
    .select('MOVIE_NAME')
    .first();

console.log(`Guardians of the galaxy 2 is ${secondGuardians.MOVIE_NAME}`);

const shortThirdPhase = await Movie.query()
    .where('MOVIE_DURATION', '<', 130)
    .andWhere('PHASE_ID', 3)
    .select('MOVIE_NAME');

console.table(shortThirdPhase);

const shortAndLong = await Movie.query()
    .where('MOVIE_DURATION', '<', 120)
    .orWhere('MOVIE_DURATION', '>', 170)
    .orderBy('MOVIE_DURATION', 'desc')
    .select('MOVIE_NAME');

console.table(shortAndLong);

const count = await Movie.query().resultSize();
console.log(`There are ${count} movies in the database`);

knexdb.destroy(); // Close the Knex connection pool when done
