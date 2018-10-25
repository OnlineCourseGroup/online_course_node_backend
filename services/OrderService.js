const BaseService = require('./BaseService');
const OrderController = require('../controller/OrderController');

class OrderService extends BaseService {
  constructor() {
    super();
    this.controller = new OrderController();
  }
}
module.exports = new OrderService();
