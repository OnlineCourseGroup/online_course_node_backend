const BaseService = require('./BaseService');
const OrderController = require('../controller/OrderController');

class OrderService extends BaseService {
  constructor() {
    super();
    this.controller = new OrderController();
  }

   // 插入方法
  async insert(ctx) {
    const row = ctx.request.body
    const { success, err } = await this.controller.add(row)
    if (success) {
      // successWithCode 为没有数据返回时的成功返回
      ctx.body = successWithCode('添加成功') // 没有数据则返回
    } else {
      // 同上
      ctx.body = failed(err)
    }
  }
}
module.exports = new OrderService();
