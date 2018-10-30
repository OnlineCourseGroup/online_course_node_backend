const BaseService = require('./BaseService');
const AdminController = require('../controller/AdminController');
const { pojo,} = require('../helper'); // 获取辅助类里面的一些方法
const { failed, successWithCode } = pojo; // 获取消息集里的一些辅助方法
class AdminService extends BaseService {
  constructor() {
    super();
    this.controller = new AdminController();
  }  

  async login(ctx) {
    const { success, err, data } = await this.execute(ctx, 'login');
    if (success) {
      const { count } = data;
      if (count >= 1) {
        ctx.body = successWithCode(true);
      } else {
        ctx.body = successWithCode(false);
      }
    } else {
      ctx.body = failed(err);
    }
  }

  async login(ctx) {
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
}
module.exports = new AdminService();
