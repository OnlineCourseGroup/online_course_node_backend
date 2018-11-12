const BaseController = require( './BaseConroller');
class UserController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_user';
  }

  async single(row) {
    const { managerName, password } = row;
    const sql = `select count(*) from ${this.table} where name=? and password = ?`;
    return await this.excute(sql, [id]);
  }
 
}
module.exports = UserController;
