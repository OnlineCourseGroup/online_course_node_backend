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
  async single(row) {
    const { id  } = row;
    const sql = `select * from ${this.table} where id = ?`;
    return await this.excute(sql, [id]);
  }
  async update(row) {
    const { id  } = row;
    const sql = `update ${this.table} set account = ?  where id = ?`;
    return await this.excute(sql, [id]);
  }
  async delect(row) {
    const { id  } = row;
    const sql = `delect * from ${this.table} where id = ?`;
    return await this.excute(sql, [id]);
  }
}
module.exports = UserController;
