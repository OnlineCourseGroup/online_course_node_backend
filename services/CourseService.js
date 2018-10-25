const BaseService = require('./BaseService');
const CourseController = require('../controller/CourseController');

class CourseService extends BaseService {
  constructor() {
    super();
    this.controller = new CourseController();
  }

}
module.exports = new CourseService();
