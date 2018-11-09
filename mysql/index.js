/*
 * @Author: 李晓丹 
 * @Date: 2018-11-07 13:17:52 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-11-08 14:27:55
 */
var mysql = require('mysql');

var config = {
    host:'localhost',
    user:'root',
    password:'root',
    database:'1608b',
    connectionLimit:100,
    port:3306
}

var pool = mysql.createPool(config);

// select * from userlist where id=?  [2]   回调函数

// select * from userlist  回调函数

/**
 * 连接数据库，sql操作
 * @param {string} sql    sql语句
 * @param {array} query   参数
 * @param {function} fn   回调函数
 */
module.exports = function(sql,query,fn){     //('select * from userlist',,function(){})

    fn = fn ? fn : query;

    query = query || [];

    function connectionCallback(error,con){
        if(error){
            fn(error)
        }else{
            con.query(sql,query,function(err,results){
                con.release();
                queryCallback(err,results);
            })
        }
    }

    function queryCallback(err,results){
        if(err){
            fn(err)
        }else{
            fn(null,results);
        }
    }


    pool.getConnection(connectionCallback)
}