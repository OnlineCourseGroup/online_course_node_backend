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

}
module.exports = OrderController;
