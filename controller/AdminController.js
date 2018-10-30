const BaseController = require( './BaseConroller');
const { STATUS } = require('../enum') // 导入枚举类型STATUS

class AdminController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_admin';
  }

  async login(row) {
    const { account, password } = row;
    const sql = `select count(*) as count from ${this.table} where account=? and password = ?`;
    return await this.excute(sql, [account, password, STATUS.NORMAL], true);
  }
}
module.exports = AdminController;
