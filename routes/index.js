
const router = require('koa-router')();
const services = {
  admin: require('../services/AdminService'),
  user: require('../services/UserService'),
  manager: require('../services/ManagerService'),
  comment: require('../services/CommentService'),
  subject: require('../services/SubjectService'),
  course: require('../services/CourseService'),
  order: require('../services/OrderService'),
  rsa: require('../services/RSAService'),
};
// 配置所有的routes文件
const routes = (config => {
	return config.reduce((copy, name) => {
    const obj = require(`./${name}`)
    const newArr = Object.keys(obj).reduce((total, each) => {
      let item = { path: `/api/${name}/${each}`, method: obj[each].method, action: each, _origin: name }
      total.push(item)
      return total
    }, [])
    copy = copy.concat(newArr)
	  return copy
	}, [])
})([
  'manager',
  'order',
  'comment',
  'admin',
  'user',
  'subject',
  'course',
  'rsa',
])

// 配置最终的路由，形式为
// router.get(url, service.action)
routes.forEach(item => {
  const { _origin: serviceName, action, path, method } = item;
  // console.log(serviceName);
  const service = services[serviceName];
  // console.log(service);
  router[method](path, (ctx) => service[action](ctx))
})
module.exports = router
