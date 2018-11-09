var sql = require('../../mysql/sql'); //sql语句

var query = require('../../mysql');

var uuid = require('node-uuid');

//添加账单
function addBill(req,res,next){
    var params = req.body;

    //lid,uid,cid,create_time,c_type,money
    var uid = params.uid,
        cid = params.cid,
        timer = params.create_time,
        type = params.type,
        money = params.money;

    if(!uid || !cid || !timer || !type || !money){
        res.json({code:4,msg:"缺少参数"})
    }else{
        var lid = uuid.v1();
        query(sql.ADD_BILL,[lid,uid,cid,timer,type,money],function(error,results){
            if(!error){
                res.json({code:1,msg:"添加成功",lid:lid})
            }else{
                res.json({code:0,error})
            }
        })
    }

}

//删除账单
function delBill(req,res,next){
    var lid = req.query.lid;

    query(sql.DEL_BILL,[lid],function(error,results){
        if(!error){
            res.json({code:1,msg:"删除成功"})
        }else{
            res.json({code:0,error})
        }
    })
}

module.exports = {
    addBill:addBill,
    delBill:delBill
}