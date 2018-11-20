module.exports = {
    //添加用户
    ADD_USER:"insert into userlist (uid,nick_name) values (?,?)",

    //查询用户名是否存在
    SELECT_ISHAS:"select * from userlist where nick_name=?",

    //添加分类
    //uid window.localstroage.getItem('uid')   c_type innerHTML  
    ADD_CLASSIFY:'insert into classify (cid,c_name,c_icon,c_type,uid) values (?,?,?,?,?)',

    //查询分类是否存在
    CLASSIFY_ISHAS:'select * from classify where c_name=? and (uid=? or uid="*")',

    //查询所有分类
    SELECT_ALL_CLASSIFY:'select * from classify where uid="*" or uid=?',

    //获取所有的icon图标
    SELECT_ALL_ICON:'select * from iconlist',

    //添加账单

    //lid uid cid create_time //什么时候花的时间 c_type money
    ADD_BILL:'insert into loglist (lid,uid,cid,create_time,money) values (?,?,?,?,?)',

    //删除账单
    DEL_BILL:'delete from loglist where lid=?',

    //按年月查找所有的账单
    SELECT_MONTH_BILL:'select l.*,c.c_icon,c.c_name,c.c_type from loglist l,classify c,userlist u where l.uid=? and l.cid=c.cid and l.uid=u.uid and date_format(l.create_time,"%Y-%m")=? order by l.create_time desc',

    //按年月并且收支类型（收入和支出）查找所有的账单
    SELECT_MONTH_TYPE_BILL:'select l.*,c.c_icon,c.c_name,c.c_type from loglist l,classify c,userlist u where l.uid=? and l.cid=c.cid and l.uid=u.uid and date_format(l.create_time,"%Y-%m")=? and c.c_type=? order by l.create_time desc',

    //按年月并且收支分类查找所有的账单   c.cid in (?)    ["cid1","cid2",.....]
    SELECT_MONTH_CLASSIFY_BILL:'select l.*,c.c_icon,c.c_name,c.c_type from loglist l,classify c,userlist u where l.uid=? and l.cid=c.cid and l.uid=u.uid and date_format(l.create_time,"%Y-%m")=? and c.c_name in (?) order by l.create_time desc',

    //按年查找所有的账单
    SELECT_YEAR_BILL:'select l.*,c.c_icon,c.c_name,c.c_type from loglist l,classify c,userlist u where l.uid=? and l.cid=c.cid and l.uid=u.uid and date_format(l.create_time,"%Y")=? order by l.create_time desc',

    //按年并且收支类型（收入和支出）查找所有的账单
    SELECT_YEAR_TYPE_BILL:'select l.*,c.c_icon,c.c_name,c.c_type from loglist l,classify c,userlist u where l.uid=? and l.cid=c.cid and l.uid=u.uid and date_format(l.create_time,"%Y")=? and c.c_type=? order by l.create_time desc',

    //按年并且收支分类查找所有的账单   c.cid in (?)    ["cid1","cid2",.....]
    SELECT_YEAR_CLASSIFY_BILL:'select l.*,c.c_icon,c.c_name,c.c_type from loglist l,classify c,userlist u where l.uid=? and l.cid=c.cid and l.uid=u.uid and date_format(l.create_time,"%Y")=? and c.c_name in (?) order by l.create_time desc'
}