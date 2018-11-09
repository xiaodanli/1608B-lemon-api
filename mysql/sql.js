module.exports = {
    //添加用户
    ADD_USER:"insert into userlist (uid,nick_name) values (?,?)",
    //查询用户名是否存在
    SELECT_ISHAS:"select * from userlist where nick_name=?"
}