var express = require('express')
var router = express.Router()
var db = require('../db/dbasync');
var msg=require('../message')
var auth = require('../auth/checkauth');
var jwt = require('jsonwebtoken');


router.get('/getKPPN', async function (req, res) {
    try {       
        let SQL = `SELECT * FROM t_kppn ORDER BY kdkppn`
        let queryResult=await db.myexec(SQL);
        res.status(200).json(queryResult)

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/cekKPPN',auth.authenticateToken, async function (req, res) {

    let rb=req.body;

    try {       
        let SQL = `SELECT kdkppn FROM t_kppn WHERE kdkppn=?`
        let queryResult=await db.myexec(SQL,[rb.kdkppn]);
        res.status(200).json(queryResult)

    } catch (error) {
        res.status(200).json(msg[1])
    }
});


router.post('/saveKPPN',auth.authenticateToken, async function (req, res) {
    let rb=req.body;
    try {       
        let SQL = `INSERT INTO t_kppn(kdkppn,nmkppn) VALUES(?,?)`;
        let nilai=[rb.kdkppn,rb.nmkppn]
        await db.myexec(SQL,nilai);
        res.status(200).json(msg[3])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/updateKPPN',auth.authenticateToken, async function (req, res) {
    let rb=req.body;
    try {       
        let SQL = `UPDATE t_kppn SET nmkppn=? WHERE kdkppn=?`;
        let nilai=[rb.nmkppn,rb.kdkppn]
        await db.myexec(SQL,nilai);
        res.status(200).json(msg[4])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/deleteKPPN',auth.authenticateToken, async function (req, res) {
    let rb=req.body;
    try {       
        let SQL = `DELETE FROM t_kppn WHERE kdkppn=?`;
        let nilai=[rb.kdkppn]
        await db.myexec(SQL,nilai);
        res.status(200).json(msg[5])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

module.exports = router
