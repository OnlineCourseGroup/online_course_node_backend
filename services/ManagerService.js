const BaseService = require('./BaseService');
const ManagerController = require('../controller/ManagerController');

class ManagerService extends BaseService {
  constructor() {
    super();
    this.controller = new ManagerController();
  }
}
module.exports = ManagerService;
