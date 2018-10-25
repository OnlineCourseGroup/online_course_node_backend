const BaseService = require('./BaseService');
const AdminController = require('../controller/AdminController');

class AdminService extends BaseService {
  constructor() {
    super();
    this.controller = new AdminController();
  }  
  
  async login(ctx) {
    const row = ctx.request.body;
    const { success, err } = await this.controller.login(row);
    if (success) {
      ctx.body = success(true);
    } else {
      ctx.body = failed(err);
    }
  }
}
module.exports = new AdminService();
