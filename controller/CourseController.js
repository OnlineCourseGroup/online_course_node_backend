const BaseController = require( './BaseConroller');
class CourseController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_course';
  }

}
module.exports = CourseController;
