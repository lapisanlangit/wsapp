var express = require('express')
var router = express.Router()
var db = require('../db/dbasync');
var msg=require('../message')
var auth = require('../auth/checkauth');
var jwt = require('jsonwebtoken');


router.get('/getSatker',auth.authenticateToken, async function (req, res) {
    try {       
        let SQL = `SELECT * FROM t_satker ORDER BY kdsatker`
        let queryResult=await db.myexec(SQL);
        res.status(200).json(queryResult)

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.get('/getSatkerbyKPPN',auth.authenticateToken, async function (req, res) {
    try {       
        let SQL = `SELECT * FROM t_satker WHERE kdkppn=? ORDER BY kdsatker`
        let queryResult=await db.myexec(SQL,[req.query.kdkppn]);
        res.status(200).json(queryResult)

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/cekSatker',auth.authenticateToken, async function (req, res) {

    let rb=req.body;

    try {       
        let SQL = `SELECT kdsatker FROM t_satker WHERE kdsatker=?`
        let queryResult=await db.myexec(SQL,[rb.kdsatker]);
        res.status(200).json(queryResult)

    } catch (error) {
        res.status(200).json(msg[1])
    }
});


router.post('/saveSatker',auth.authenticateToken, async function (req, res) {
    let rb=req.body;
    try {       
        let SQL = `INSERT INTO t_satker(kdsatker,nmsatker,kdkppn) VALUES(?,?,?)`;
        let nilai=[rb.kdsatker,rb.nmsatker,rb.kdkppn]
        await db.myexec(SQL,nilai);
        res.status(200).json(msg[3])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/updateSatker',auth.authenticateToken, async function (req, res) {
    let rb=req.body;
    try {       
        let SQL = `UPDATE t_satker SET nmsatker=?,kdkppn=? WHERE kdsatker=?`;
        let nilai=[rb.nmsatker,rb.kdkppn,rb.kdsatker]
        await db.myexec(SQL,nilai);
        res.status(200).json(msg[4])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

router.post('/deleteSatker',auth.authenticateToken, async function (req, res) {
    let rb=req.body;
    try {       
        let SQL = `DELETE FROM t_satker WHERE kdsatker=?`;
        let nilai=[rb.kdsatker]
        await db.myexec(SQL,nilai);
        res.status(200).json(msg[5])

    } catch (error) {
        res.status(200).json(msg[1])
    }
});

module.exports = router
