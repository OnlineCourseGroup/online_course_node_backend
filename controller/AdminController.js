const BaseController = require( './BaseConroller');
class AdminController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_admin';
  }

  async login(row) {
    const { adminName, password } = row;
    const sql = `select count(*) from ${this.table} where admin_name=? and password = ?`;
    return await this.excute(sql, [adminName, password, STATUS.NORMAL]);
  }
}
module.exports = AdminController;
