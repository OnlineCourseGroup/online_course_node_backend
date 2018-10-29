const mysql = require('mysql');
const config = require('../config/default.js');
// 连接池
const pool  = mysql.createPool({ 
  host     : config.database.HOST, // 数据库连接端口
  user     : config.database.USERNAME, // 数据库用户名
  password : config.database.PASSWORD, // 数据库密码
  database : config.database.DATABASE // 数据库名称
});

/**
 * 
 * @param sql 接收的sql语句
 * @param {Array} values sql语句参数
 * @return { Object } { success: boolean, err || data  }
 */
const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( {
          success: false,
          err,
        } )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            resolve({
              success: false,
              err,
            } )
          } else {
            resolve( {
              success: true,
              data: rows.length === 1 ? rows[0] : rows,
            } )
          }
          connection.release()
        })
      }
    })
  })
}
module.exports={
  query,
}
