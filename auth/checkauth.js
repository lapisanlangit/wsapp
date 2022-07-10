var jwt = require('jsonwebtoken');
var msg=require('../message')

module.exports = {
    authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) {
      res.status(200).json(msg[13])
    } 
  
    jwt.verify(token, process.env.PENGACAK_TOKEN, (err) => {
      console.log(err)
  
      if (err){
        res.status(200).json(msg[13])

      }
      next()
    })
  }
}