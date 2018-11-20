
var sql = require('../../mysql/sql'); //sql语句

var query = require('../../mysql');

var uuid = require('node-uuid');

function addUser(req,res,next){
    
    var nick_name = req.body.nick_name;

    var uid = req.body.uid;

    if(!uid){
        isHas();
    }else{
        res.json({code:3,msg:"用户已存在"})
    }

    //是否存在用户名
    function isHas(){
        query(sql.SELECT_ISHAS,[nick_name],function(error,results){
            if(!error){  
                if(results.length > 0){
                    res.json({code:3,msg:"此昵称已被使用"})
                }else{
                    add();
                }
            }else{
                res.json({code:0,error})
            }
        })
    }

    //添加用户
    function add(){

        uid = uuid.v1();
        query(sql.ADD_USER,[uid,nick_name],function(error,results){
            if(!error){
                res.json({code:1,msg:"添加成功",uid:uid})
            }else{
                res.json({code:0,error})
            }
        })
    }

    // res.json({code:1,data:'成功'})
}

module.exports = {
    addUser:addUser
}