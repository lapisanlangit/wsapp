const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname,'../'+process.env.NODE_ENV + '.env')
  
});


var mysql = require('mysql')
   var pool = mysql.createPool({
   connectionLimit:50,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
   database:process.env.DB_DATABASE,
   timezone: 'utc'
})
// console.log(pool)

module.exports.connectionpool = pool;