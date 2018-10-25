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
  process.exit(0);
 
});

