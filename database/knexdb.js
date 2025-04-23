import knex from 'knex';
import config from './knexfile.js';

const knexdb = knex(config);
export default knexdb;