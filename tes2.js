const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw ='orcl'

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "MPNG2OLAP",
      password      : mypw,
      connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST   = 10.242.104.82)(PORT = 1521))(CONNECT_DATA =(SID= GGOLAP)))"
    });

    const result = await connection.execute(
      `SELECT * FROM M_CA WHERE CA_ID=:1 OR CA_ID=:2`,
      ['525120000990','521031000990'],  // bind value for :id
    );
    console.log(result.rows);

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