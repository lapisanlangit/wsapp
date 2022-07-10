var oracledb = require('oracledb');
oracledb.getConnection({
      user: "MPNG2OLAP",
      password: 'orcl',
      connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST   = 10.242.104.82)(PORT = 1521))(CONNECT_DATA =(SID= GGOLAP)))"
}, function(err, connection) {
if (err) {
    console.error(err.message);
    return;
}
     connection.execute("SELECT * FROM M_CA",[], function(err, result) {
    if (err) { console.error(err.message);
          doRelease(connection);
          return;
     }
     console.log(result.metaData);
     console.log(result.rows);
     doRelease(connection);
   });
});
function doRelease(connection) {
       connection.release(function(err) {
         if (err) {
          console.error(err.message);
        }
      }
   );
}