const BaseService = require('./BaseService');
const ManagerController = require('../controller/ManagerController');

class ManagerService extends BaseService {
  constructor() {
    super();
    this.controller = new ManagerController();
  }
  
  async login(ctx) {
    await this.execute(ctx, 'login', true);
  }
}
module.exports = new ManagerService();
