// This is a configuration file for Knex.js, a SQL query builder for Node.js.
// It defines the database connection settings for different environments: development, test, and production.
// knexfile.js
export default {
  development: {
    client: 'oracledb',
    connection: {
      user: 'SYSTEM',
      password: 'password',
      connectString: 'localhost:1521/xe'
    },
    pool: { min: 0, max: 7 }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:', // in-memory DB
    },
    useNullAsDefault: true, // required for SQLite
  },
  // production: {
  //   client: 'oracledb',
  //   connection: {
  //     user: 'prod_user',
  //     password: 'prod_pass',
  //     connectString: 'prod-db/XEPDB1',
  //   },
  // },
};
