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
  async single(ctx) {
    const { success, err, data } = await this.execute(ctx, 'single');
    if (success) {
      const keys = Object.keys(data);
      if (keys > 0) {
        ctx.body = successWithCode(data);
      } else {
        ctx.body = failed('操作失败');
      }
    } else {
      ctx.body = failed(err);
    }
  }
  async delete(ctx) {
    const { success, err, data } = await this.execute(ctx, 'delect');
    if (success) {
      const keys = Object.keys(data);
      if (keys > 1) {
        ctx.body = successWithCode(data);
      } else {
        ctx.body = failed('删除失败');
      }
    } else {
      ctx.body = failed(err);
    }
  }
  async update(ctx) {
    const { success, err, data } = await this.execute(ctx, 'update');
    if (success) {
      const keys = Object.keys(data);
      if (keys > 1) {
        ctx.body = successWithCode(data);
      } else {
        ctx.body = failed('修改失败');
      }
    } else {
      ctx.body = failed(err);
    }
  }
}
module.exports = new UserService();
