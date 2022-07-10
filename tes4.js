const oracledb = require('oracledb');
const dbConfig = require('./db/dbpoolora.js');

async function run() {
  
    let connection;
  try {
    let sql, result;
    connection = await oracledb.getConnection(dbConfig);

    sql = `SELECT * FROM M_CA`;
    result = await connection.execute(sql);
    console.log("Current date query results: ");
    console.log(result);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();