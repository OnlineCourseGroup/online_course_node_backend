const BaseService = require('./BaseService');
const ManagerController = require('../controller/ManagerController');

class ManagerService extends BaseService {
  constructor() {
    super();
    this.controller = new ManagerController();
  }
  async login(ctx) {
    const row = ctx.request.body;
    const { success, err } = await this.controller.login(row);
    if (success) {
      ctx.body = success(true);
      return;
    } else {
      ctx.body = failed(err);
      return;
    }
  }
}
module.exports = new ManagerService();
