var express = require('express');
var router = express.Router();

var billApi = require('./bills');

router.post('/api/addBill',billApi.addBill);

router.get('/api/delBill',billApi.delBill);

router.get('/api/getBill',billApi.getBill);

module.exports = router