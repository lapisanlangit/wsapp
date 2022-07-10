const dbConfig = require('./dbpoolora.js');
const oracledb = require('oracledb');


module.exports = {
    oraexec: async(sql,parameters) => {
        return new Promise( async(resolve, reject) => {

            const pool= await oracledb.createPool(dbConfig.hrPool)
            const connection= await pool.getConnection();

                // var querySQL = queryBindToString(sql, parameters)
                connection.execute(sql, parameters,{ outFormat: oracledb.OBJECT },function(err, result) {
                    // connection.close();

                    // await connection.close();

                    if (err) {
                        if(process.env.NODE_ENV=='development'){
                            console.error(err);
                        }
                       
                        reject(err.sqlMessage);
                    }
                    if(process.env.NODE_ENV=='development'){
                    //    console.log('\033[32m', "SQL QUERY => " + querySQL);
                     }

     
                    resolve(result);
                });
            });
        
    },

    beginTrans: async () => {
        return new Promise((resolve, reject) => {
            db.connectionpool.getConnection(function (err, connection) {
                connection.beginTransaction(function (err) {
                    if (err) {
                        
                        reject(err.sqlMessage);
                    }
                    resolve(connection);
                    if (process.env.NODE_ENV == 'development') {
                        console.log('\033[32m', "BEGIN TRANSACTION");
                    }
                });

            });
        })
    },

    execTrans: async (connection, sql, parameters) => {
        return new Promise((resolve, reject) => {
            var querySQL = mysql.format(sql, parameters)
            var query=connection.query(querySQL, function (err, result, fields) {
                if (err) {
                    if (process.env.NODE_ENV == 'development') {
                        console.log(query.sql);
                        console.error(err);
                    }

                    reject(err.sqlMessage);
                    return connection.rollback(function () {
                        throw error;
                    });
                }
                if (process.env.NODE_ENV == 'development') {
                    console.log('\033[32m', "SQL QUERY => " + query.sql);
                }
                resolve(result);
            });

        })
    },

    commitTrans: async (connection) => {
        return new Promise((resolve, reject) => {
            connection.commit(function (err) {
                if (err) {

                    if (process.env.NODE_ENV == 'development') {
                        console.log(query.sql);
                        console.error(err);
                    }

                    reject(err.sqlMessage);
                    
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                if (process.env.NODE_ENV == 'development') {
                    console.log('\033[32m', "COMMIT");
                }
                resolve();
            });
        })
    }

}
