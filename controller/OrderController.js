const BaseController = require( './BaseConroller');
class OrderController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_order';
  }

}
module.exports = OrderController;
