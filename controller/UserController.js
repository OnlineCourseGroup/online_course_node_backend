const BaseController = require( './BaseConroller');
class UserController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_user';
  }

  async login(row) {
    const { userName, password } = row;
    const sql = `select count(*) from ${this.table} where user_name=? and password = ?`;
    return await this.excute(sql, [userName, password, STATUS.NORMAL]);
  }
}
module.exports = UserController;
