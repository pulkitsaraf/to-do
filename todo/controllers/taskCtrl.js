
var express = require('express');
var router = express.Router();
var responseService = require('../services/responseService');
var web3Service = require('../services/web3Service');


router.post("/", async function (req, res) {
    try {
        const result = await web3Service.createTask(req.body.name)
        responseService.response(req,null,result,res);
    } catch (error) {
        responseService.response(req,error,null,res);
    }
});

router.put("/assign", async function (req, res) {
    try {
        const result = await web3Service.assignTask(req.body.taskId,req.body.toAddress)
        responseService.response(req,null,result,res);
    } catch (error) {
        responseService.response(req,error,null,res);
    }
});

router.put("/status", async function (req, res) {
    try {
        const result = await web3Service.markTaskToComplete(req.body.taskId)
        responseService.response(req,null,"Task Marked as Completed",res);
    } catch (error) {
        responseService.response(req,error,null,res);
    }
});

module.exports.task = router;
