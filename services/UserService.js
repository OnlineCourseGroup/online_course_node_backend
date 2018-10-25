const BaseService = require('./BaseService');
const UserController = require('../controller/UserController');

class UserService extends BaseService {
  constructor() {
    super();
    this.controller = new UserController();
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
module.exports = new UserService();
