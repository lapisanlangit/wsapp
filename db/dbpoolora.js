const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname,'../'+process.env.NODE_ENV + '.env')
  
});

module.exports = {

  hrPool: {
    user:"MPNG2OLAP",
    password:  "orcl",
    connectString:"(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST   = 10.242.104.82)(PORT = 1521))(CONNECT_DATA =(SID= GGOLAP)))",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};




