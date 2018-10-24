var Koa=require('koa');
var path=require('path')
var bodyParser = require('koa-bodyparser');
var session = require('koa-session-minimal');
var MysqlStore = require('koa-mysql-session');
var config = require('./config/default.js');
// var router=require('koa-router')
// var views = require('koa-views')
var koaStatic = require('koa-static')
var app=new Koa()
const routers = require('./routes/index')
const METHODS = [
  'PUT',
  'DELETE',
  'POST',
  'GET',
  'OPTION',
];

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 配置跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  ctx.set('Access-Control-Allow-Methods', METHODS.join(','));
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Max-Age', 3600 * 24);
  await next();
});
// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './public')
))

// // 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))

// 使用表单解析中间件
app.use(bodyParser())

// 使用新建的路由文件
// app.use(require('./routers/signin.js').routes())
app.use(routers.routes()).use(routers.allowedMethods())

// app.use(require('./routers/user').routes())
// app.use(require('./routers/posts.js').routes())
// app.use(require('./routers/signout.js').routes())


const __sql = `create table if not exists online_course_user(
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  user_name varchar(50)  NOT NULL COMMENT '用户的昵称',
  user_password varchar(16) NOT NULL COMMENT '用户密码',
  user_phone varchar(11) NOT NULL COMMENT '用户的手机号',
  user_balance int(11) NULL COMMENT '用户的余额',
  user_bank_card_no varchar(19) NOT NULL COMMENT '用户银行卡账号', -- 正常为16/17,信用卡为16,最长的为19
  user_id_card_no varchar(18) NOT NULL COMMENT '用户身份证号', -- 新版为18，老版为15
  gmt_create_time int(11) NOT NULL COMMENT '用户创建时间<格林威治>(20180607)',
  status int(11) DEFAULT 200 NULL COMMENT '用户的状态（删除为404,正常为200, etc）',
  user_info varchar(500) NULL COMMENT 'region、gender、age、interest_subject_ids、etc',
  extra_info varchar(300) NOT NULL DEFAULT '{}' COMMENT '一些额外信息',
  PRIMARY KEY (id)
 );`;
 const drop = 'drop table if exists online_course_user;'

const sqls = require('./sql/createSql');
const { query } = require('./lib/mysql');
// 执行一遍数据库
setImmediate(async () => {
  for(const each of sqls) {
    const { drop, create, use} = each;
    await query(drop, []);
    await query(create, []);
    if (use) await query(use, []);
  }
  console.log('Execut create sql successed!');
  // const { success, data, err } = await query(drop, []);
  // await query(__sql, []);
  // if (success) {
  //   console.log('Execut create sql successed!');
  // } else {
  //   console.log(err);
  // }
 
});



// 监听在1200
app.listen(config.port)

console.log(`listening on port ${config.port}`)
