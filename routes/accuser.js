var express = require('express')
var router = express.Router()
var db = require('../db/dbasync');
var msg=require('../message')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

router.post('/login/', async function (req, res) {

    let rb=req.body;

    try {
        let SQL = `SELECT a.*,b.nmlevel
        FROM t_user a INNER JOIN t_level b ON a.level=b.level
        WHERE UPPER(TRIM(email))=?`
        let nilai = [rb.email.toUpperCase()]
        let queryResult = await db.myexec(SQL, nilai);
 
        if (queryResult.length == 0) {
            res.status(200).send([{
                "token": ""
            }]);
            return;
        }

        // Calling createHash method
        const hash = crypto.createHash('sha256', process.env.SECRET).update(rb.password).digest('hex');
         
        if (hash==queryResult[0].password) {
            var token = jwt.sign({
                iss: 'Aplikasi MyApp',
                email: queryResult[0].email,
                level: queryResult[0].level,
                
            }, process.env.PENGACAK_TOKEN);

            res.status(200).send([{
                    "token": token,
                    "nama": queryResult[0].nama,
                    "kdsatker": queryResult[0].kdsatker,
                    "nmlevel": queryResult[0].nmlevel
                }]
            );

        } else {

            res.status(200).send([{
                "token": ""
            }]);
            return;
        }

    } catch (error) {
        // console.log(error)
        res.status(200).json(msg[9])

    }
})

module.exports = router
