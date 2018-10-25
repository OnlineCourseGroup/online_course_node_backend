const BaseController = require( './BaseConroller');
class CommentController extends BaseController {
  constructor(props) {
    super(props);
    this.table = 'online_course_comment';
  }
}
module.exports = CommentController;
