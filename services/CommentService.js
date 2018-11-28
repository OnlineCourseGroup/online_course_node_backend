const BaseService = require('./BaseService');
const CommentController = require('../controller/CommentController');

class CommentService extends BaseService {
  constructor() {
    super();
    this.controller = new CommentController();
  }
}
module.exports = new CommentService();
 