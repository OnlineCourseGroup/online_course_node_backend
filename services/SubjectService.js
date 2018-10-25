const BaseService = require('./BaseService');
const SubjectController = require('../controller/SubjectController');

class SubjectService extends BaseService {
  constructor() {
    super();
    this.controller = new SubjectController();
  }
}
module.exports = new SubjectService();
