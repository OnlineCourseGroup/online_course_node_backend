const BaseController = require( './BaseConroller');
class SubjectController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_subject';
  }

}
module.exports = SubjectController;
