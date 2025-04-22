import oracledb from 'oracledb';

const connect = async () => {
  try {
    const connection = await oracledb.getConnection({
        user: 'SYSTEM',
        password: 'password',
        connectString: 'localhost:1521/xe',
    });
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

const initialiseDatabaseConnection = async () => {
  try {
    await oracledb.createPool({
      user: 'SYSTEM',
      password: 'password',
      connectString: 'localhost:1521/xe',
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1,
    });
  } catch (error) {
    console.error('Error creating connection pool:', error);
    throw error;
  }
};

const getRows = async(table, condition) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const query = condition ? `SELECT * FROM ${table} WHERE ${condition}` : `SELECT * FROM ${table}`;
    const result = await connection.execute(query);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    try {
      await connection.close();
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
}

const insertRow = async (table, dataObject) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const columns = Object.keys(dataObject).join(", "); // e.g., "column1, column2, column3"
    const bindVariables = Object.keys(dataObject).map((_, index) => `:${index + 1}`).join(", "); // e.g., ":1, :2, :3"
    const values = Object.values(dataObject); // e.g., [value1, value2, value3]

    // Construct the query
    const query = `INSERT INTO ${table} (${columns}) VALUES (${bindVariables})`;

    // Execute the query
    const result = await connection.execute(query, values);
    await connection.commit();
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    try {
      await connection.close();
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
}

const deleteRows = async (table, condition) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const query = condition ? `DELETE FROM ${table} WHERE ${condition}` : `DELETE FROM ${table}`;
    const result = await connection.execute(query);
    await connection.commit();
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    try {
      await connection.close();
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
}

const closeDatabaseConnection = async () => {
  try {
    await oracledb.getPool().close(0);
    console.log('Connection pool closed');
  } catch (error) {
    console.error('Error closing connection pool:', error);
  }
};

const database = {
  connect,
  initialiseDatabaseConnection,
  getRows,
  insertRow,
  closeDatabaseConnection,
  deleteRows,
};

export default database;