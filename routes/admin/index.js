const { GET, POST } = require('../../enum/methods');
const base = require('../base');
module.exports = {
  ...base,
  login: {
    method: POST,
  },
  single: {
    method: POST,
  },
}