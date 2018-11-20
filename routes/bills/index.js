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
        money = params.money;

    if(!uid || !cid || !timer  || !money){
        res.json({code:4,msg:"缺少参数"})
    }else{
        var lid = uuid.v1();
        query(sql.ADD_BILL,[lid,uid,cid,timer,money],function(error,results){
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

//获取账单
function getBill(req,res,next){

    var timeType = req.query.timeType;  //查找时间的类型   1 ： 年月   2：年

    //  筛选的条件   1：按收支类型（收入和支出）  2：按收支分类查询  不传参数：无筛选条件

    var selectType = req.query.selectType; 

    var uid = req.query.uid,
        time = req.query.time,
        condition =  req.query.condition;

    var sqlStr = '';
    
    
    if(timeType == 1){  //按年月查找
        if(selectType == 2){ //按收支分类查询
            sqlStr = sql.SELECT_MONTH_CLASSIFY_BILL;
        }else{  //没有筛选条件
            sqlStr = sql.SELECT_MONTH_BILL;
        }
    }else{ //按年查找
        if(selectType == 2){ //按收支分类查询
            sqlStr = sql.SELECT_YEAR_CLASSIFY_BILL;
        }else{  //没有筛选条件
            sqlStr = sql.SELECT_YEAR_BILL;
        }
    }

    console.log(sqlStr);

    if(!uid){
        res.json({code:2,msg:"此用户不存在"})
    }else{
        console.log(uid,time,condition);
        console.log(sqlStr);
        query(sqlStr,[uid,time,condition],function(error,results){
            if(error){
                res.json({code:0,error});
            }else{
                res.json({code:1,results});
            }
        })
    }

}

module.exports = {
    addBill:addBill,
    delBill:delBill,
    getBill:getBill
}