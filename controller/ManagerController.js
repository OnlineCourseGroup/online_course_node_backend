const BaseController = require( './BaseConroller');
class ManagerController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_manager';
  }
}
module.exports = ManagerController;
