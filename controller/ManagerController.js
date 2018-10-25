const BaseController = require( './BaseConroller');
class ManagerController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_manager';
  }

  async login(row) {
    const { managerName, password } = row;
    const sql = `select count(*) from ${this.table} where manager_name=? and password = ?`;
    return await this.excute(sql, [managerName, password, STATUS.NORMAL]);
  }
}
module.exports = ManagerController;
