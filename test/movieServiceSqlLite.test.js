import { Model } from "objection"
import knexdb from "../database/knexdb"
import { getAllMovies } from "./movieService";

beforeAll(async () => {
  Model.knex(knexdb);
  await knexdb.schema.createTable('movies', (table) => {
    table.increments('MOVIE_ID').primary();
    table.string('MOVIE_NAME').notNullable();
    table.string('RELEASE_DATE').notNullable(); 
    table.string('DIRECTOR').notNullable();
    table.string('WRITER').notNullable();
    table.string('PRODUCER').notNullable();
    table.string('STATUS').notNullable();
  });

  await knexdb('MOVIES').insert([
    {
      MOVIE_ID: 1,
      MOVIE_NAME: 'Avengers',
      RELEASE_DATE: '2012-04-11',
      DIRECTOR: 'Joss Whedon',
      WRITER: 'Joss Whedon',
      PRODUCER: 'Kevin Feige',
      STATUS: 'Released'
    },
    {
      MOVIE_ID: 2,
      MOVIE_NAME: 'Black Panther 1',
      RELEASE_DATE: '2018-02-16',
      DIRECTOR: 'Ryan Coogler',
      WRITER: 'Ryan Coogler, Joe Robert Cole',
      PRODUCER: 'Kevin Feige',
      STATUS: 'Released'
    }
  ]);
}); 

afterAll(async () => {
  await knexdb.schema.dropTableIfExists('movies');
  await knexdb.destroy();
});

test('check db client', async () => {
  console.log(knexdb.client.config.client);
  console.log('NODE_ENV:', process.env.NODE_ENV);

  expect(knexdb.client.config.client).toBe('sqlite3');
});

test ('getAllMovies should fetch all movies', async () => {
  const movies = await getAllMovies();
  expect(movies).toHaveLength(2);
  expect(movies[0].MOVIE_NAME).toBe('Avengers');
  expect(movies[1].MOVIE_NAME).toBe('Black Panther 1');
});