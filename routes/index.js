
const router = require('koa-router')()
// 配置所有的routes文件
const routes = (config => {
	return config.reduce((copy, name) => {
    const obj = require(`./${name}`)
    const newArr = Object.keys(obj).reduce((total, each) => {
      let item = { path: `/api/${name.toLowerCase()}/${each}`, method: obj[each].method, action: each, service: name }
      total.push(item)
      return total
    }, [])
    copy = copy.concat(newArr)
	  return copy
	}, [])
})([
  'Manager',
])

// 配置最终的路由，形式为
// router.get(url, service.action)
routes.forEach(item => {
  const { service: serviceName, action, path, method } = item;
  const Service = require(`../services/${serviceName}Service`);
  const instance = new Service();
  router[method](path, instance[action])
})
module.exports = router
