const BaseService = require('./BaseService');
const AdminController = require('../controller/AdminController');
const { pojo, allTypeReplaceUnderLine } = require('../helper'); // 获取辅助类里面的一些方法
const { failed, successWithCode, success: successPojo } = pojo; // 获取消息集里的一些辅助方法
class AdminService extends BaseService {
  constructor() {
    super();
    console.log(new BaseService());
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

  async single(ctx) {
    console.log(this);
    const { success, err, data } = await this.execute(ctx, 'single');
    if (success) {
      const keys = Object.keys(data);
      console.log(keys);
      if (keys.length > 0) {
        ctx.body = successPojo(allTypeReplaceUnderLine(data));
      } else {
        ctx.body = failed('操作失败');
      }
    } else {
      ctx.body = failed(err);
    }
  }
}
module.exports = new AdminService();
