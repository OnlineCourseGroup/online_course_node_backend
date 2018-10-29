const pojo = require('../helper/pojo');
const {
  success,
  failed,
  filterUnderLine,
} = pojo;
const NodeRSA = require('node-rsa');

class RSAService {
  constructor() {
    this.myKey = {
      isInit: false,
    }
  }
  initKey() {
    const key = new NodeRSA({
      b: 512
    }); // 生成新的512位长度密钥

    // 如果被初始化过就是解密需要的步骤
    if (this.myKey.isInit) {
      key.importKey(this.myKey.privateKey)
      return key
    }

    // 新生成的对象，保留公钥和私钥
    const publicDer = key.exportKey('public'); // 公钥
    const privateDer = key.exportKey('private'); // 私钥
    this.myKey = {
      publicKey: publicDer,
      privateKey: privateDer,
      isInit: true,
    }
  }
  async get(ctx) {
    try {
      let res;
      // 判断是否存在RSA-key对象
      if (!this.myKey.isInit) {
        this.initKey(); // 初始化key 对象
      }
      res = success(this.myKey.publicKey);
      ctx.body = res;
    } catch (err) {
      res = failed(err);
    }
  }
  async login(ctx) {
    let res;
    try {
      const val = ctx.request.body;
      // const { controller = 'Admin' } = val;
      if (!this.myKey.isInit) {
        res = {
          retCode: 403,
          message: '密钥无法匹配，请重新获取密钥'
        }
      } else {
        const myKey = this.initKey(); // 通过私钥获取RSA对象
        const data = Object.keys(val).reduce((init, key) => {
          const beforeDencrypt = val[key]; // 解密前
          const item = myKey.decrypt(beforeDencrypt, 'utf8') // 解密后
          init[key] = item;
          return init;
        }, {})
        // 调用真正的登录接口
        // const service = require('../services/AdminService');
        // ctx.request.body = data;
        const Controller = require('../controller/AdminController');
        await new Controller().login(data).then(result => {
          const { success: flag, data, err } = result;
          if (flag) {
            const { count } = data;
            if (count < 1)
              res = failed('用户名或密码不对');
            else 
              res = success(true);
          } else {
            res = failed(err);
          }
         
        })
      }
      ctx.body = res
    } catch (err) {
      res = failed(err)
    }
  }
}
module.exports = new RSAService();