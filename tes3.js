var db = require('./db/dbora');


async function run() {
    try {       
        let SQL = `SELECT * FROM M_CA WHERE CA_ID=:1`
        let queryResult=await db.oraexec(SQL,['525120000990']);
        console.log(queryResult.rows)
        // res.status(200).json(queryResult)

    } catch (error) {
        console.log(error)
        // res.status(200).json(msg[1])
    }
}

run();
