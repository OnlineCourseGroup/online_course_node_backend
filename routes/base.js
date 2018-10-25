const { GET, POST } = require('../enum/methods');
module.exports = {
  list: {
    method: GET,
  },
  insert: {
    method: POST,
  },
  update: {
    method: POST,
  },
  delete: {
    method: POST,
  }
}