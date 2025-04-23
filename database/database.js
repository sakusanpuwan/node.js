import oracledb from './oracledb.js';
import Film from './Film.js';
import knexdb from './knexdb.js';


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

const newFilms = [
    {
        "TITLE" : "21 Jump Street",
        "DURATION" : 109,
        "RATING" : "12A"
    },
    {
        "TITLE" : "John Wick",
        "DURATION" : 132,
        "RATING" : "18"
    }
]
const insertFilmResult = await Film.insert(newFilms);
const knexFilmData = await Film.findAll();
console.table(knexFilmData);
const knexFilmTitleData = await Film.findAllTitles();
console.table(knexFilmTitleData);
const knexFilteredFilmData = await Film.findByFilter({TITLE: 'John Wick', ID: 42});
console.table(knexFilteredFilmData);
await Film.deleteByFilter({TITLE: 'John Wick'});
await Film.deleteByFilter({TITLE: '21 Jump Street'});
const knexFilmDataAfterDelete = await Film.findAll();
console.table(knexFilmDataAfterDelete);

knexdb.destroy(); // Close the Knex connection pool

