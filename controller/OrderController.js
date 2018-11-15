const BaseController = require( './BaseConroller');
class OrderController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_order';
  }
  add(row) {
    row.timestampCreateTime = Date.now();
    return this.insert(row);
  }
  async single(row) {
    const { id  } = row;
    const sql = `select * from ${this.table} where id = ?`;
    return await this.execute(sql, [id]);
  }

}
module.exports = OrderController;
