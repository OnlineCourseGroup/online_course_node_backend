const BaseService = require('./BaseService');
const AdminController = require('../controller/AdminController');

class AdminService extends BaseService {
  constructor() {
    super();
    this.controller = new AdminController();
  }  

  async login(ctx) {
    await this.execute(ctx, 'login', true);
  }
}
module.exports = new AdminService();
