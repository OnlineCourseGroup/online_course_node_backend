const sqls = require('./sql/createSql');
const { query } = require('./lib/mysql');
const { drop, createDB, useDB } = require('./sql/createDB');
const init = () => {
  return new Promise(async (res, rej) => {
    console.log('create SQL is:', createDB);  
    await query(drop, []);
    await query(createDB, []);
    await query(useDB, []);
    res(true)
  });
}
init().then(() => {
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
    // 添加超级管理员
    const isDev = process.env.NODE_ENV === 'DEV';
    if (isDev) {
      const datas = require('./sql/data');
      for(const data of datas) {
        const { insert } = data;
        await query(insert, []);
      }
    }
    process.exit(0);
   
  });
})



