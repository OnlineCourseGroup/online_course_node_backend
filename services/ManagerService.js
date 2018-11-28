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
module.exports = new ManagerService();
