const oracledb = require('oracledb');

async function run(){

    await oracledb.createPool({
        user          : "MPNG2OLAP",
        password      : "orcl",
        connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST   = 10.242.104.82)(PORT = 1521))(CONNECT_DATA =(SID= GGOLAP)))"
   
      });
      
      oracledb.getConnection(function(connection){
        console.log(connection)
    //      connection.execute('SELECT * FROM M_CA WHERE CA_ID=:1',['525120000990'],function(err, result) {
       
    //          console.log(result.rows);
  
    //   });
 
    });

}

run();
