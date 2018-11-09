var sql = require('../../mysql/sql'); //sql语句

var query = require('../../mysql');

var uuid = require('node-uuid');

//添加分类
function addClassify(req,res,next){
    var params = req.body;

    // cid,c_name,c_icon,c_type,uid
    var cName = params.cName,  //分类的名称
        cIcon = params.cIcon,  //分类的图标
        cType = params.cType,   //分类属于支出还是收入
        uid = params.uid;       //用户uid
    
    if(!cName  || !cIcon || !cType || !uid){
        res.json({code:4,msg:"缺少参数"})
    }else{
        classifyIshas();
    }

    //查询分类是否存在
    function classifyIshas(){
        query(sql.CLASSIFY_ISHAS,[cName,uid],function(error,results){
            if(!error){
                if(results.length > 0){
                    res.json({code:3,msg:"此分类已存在"})
                }else{
                    add();
                }
            }else{
                res.json({code:0,error})
            }
        })
    }

    //添加分类
    function add(){
        // cid,c_name,c_icon,c_type,uid
        var cid = uuid.v1();

        query(sql.ADD_CLASSIFY,[cid,cName,cIcon,cType,uid],function(error,results){
            if(!error){
                res.json({code:0,msg:"添加成功",cid:cid})
            }else{
                res.json({code:0,error})
            }
        })
    }
}

//查询所有分类

function allClassify(req,res,next){
    var params = req.query;

    var uid = params.uid;

    if(uid){
        query(sql.SELECT_ALL_CLASSIFY,[uid],function(error,results){
            if(!error){
                res.json({code:0,results})
            }else{
                res.json({code:0,error})
            }
        })
    }else{
        res.json({code:2,msg:"用户不存在"})
    }
}

module.exports = {
    addClassify:addClassify,
    allClassify:allClassify
}