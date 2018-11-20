var express = require('express');
var router = express.Router();

var classifyApi = require('./classify');


/* 添加分类 */
router.post('/api/addClassify', classifyApi.addClassify);

//查询所有分类
router.get('/api/allClassify',classifyApi.allClassify);

router.get('/api/getIcon',classifyApi.getIcon);

module.exports = router;
