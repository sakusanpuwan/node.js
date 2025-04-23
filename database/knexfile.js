export default {
    client: 'oracledb',
    connection: {
      user: 'SYSTEM',
      password: 'password',
      connectString: 'localhost:1521/xe'
    },
    pool: { min: 0, max: 7 }
};