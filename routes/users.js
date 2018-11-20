var express = require('express');
var router = express.Router();

var userApi = require('./user');

/* 添加用户 */
router.post('/api/users', userApi.addUser );

module.exports = router;
