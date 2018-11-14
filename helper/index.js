const pojo = require('./pojo')

/**
 * 
 * @param {Object} params  参数对象
 * @param {String} sql sql语句
 * @description 根据参数对象去改变sql语句，最后返回对应的sql语句
 * @return 返回处理后的sql语句
 */
const update = (params, sql) =>  {
  let keys = Object.keys(params)
  let arr = []
  keys.forEach((key) => {
    const value =  params[key]
    if (key && value) {
      sql = sql + `${key} = ? ,`
      arr.push(value)
    }
  })
  sql = sql.substring(0, sql.length - 1)
  return {
    args: arr,
    sql,
  }
}
// /**
//  * 
//  * @param {String} val  原下划线值
//  * @param {String} char 要替换的字符
//  * @description 根据原key去替换下划线后转为驼峰
//  * @return 返回处理后的key
//  */
// const replaceUnderLine = (val, char = '_') => {
//   const arr = val.split('')
//   const index = arr.indexOf(char)
//   arr.splice(index, 2, arr[index+1].toUpperCase())
//   val = arr.join('')
//   return val
// }

/**
 * 
 * @param {String} val  原下划线值
 * @description 下划线转驼峰
 * @return 返回处理后的key
 */
const underline2Camel = (val) => {
  return val.replace(/\_(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}

/**
 * 
 * @param {String} val  原key
 * @param {String} char  要替换的字符
 * @description 驼峰转下划线
 * @return 返回处理后的key
 */
const camel2UnderLine = (val, char = '_') => {
  return val.replace(/([A-Z])/g,`${char}$1`).toLowerCase();
}

/**
 * 
 * @param {Object} obj  原对象
 * @param {String} char  要替换的字符
 * @description 对象驼峰转下划线
 * @return 返回处理后的keys 和 对应的vals { aboutExample: 'example' }, ['about_example'], ['example']
 * @return { Array } keys 
 * @return { Array } vals 
 */
const fileterCamel = (obj, char = '_') => {
  const keys = Object.keys(obj)
  return keys.reduce((init, item) => {
    let str = item;
    console.log(/[A-Z]/g.test(item))
    if (/[A-Z]/g.test(item)) {
      str = camel2UnderLine(item)
    }
    init.keys.push(str)
    init.vals.push(obj[item])
    return init
  }, {
    keys: [],
    vals: [],
  })
}

const _replace = (str, reg, identify = 'g', callback) => {
  const val = str.replace(new RegExp(reg, identify), (...props) => callback(props));
  console.log(val);
  return val;
}
const _strReplaceChar = (str, char = '_', reverse = false) => {
  if (reverse) {
    return str.replace(new RegExp(`${char}[a-z]`, 'g'), str => {
      return `${str.slice(1).toUpperCase()}`; 
    })
  }
  return str.replace(new RegExp(`[A-Z]`, 'g'), (letter, index) => {
    return index ? `${char}${letter.toLowerCase()}` : letter.toLowerCase();
  })
}

const splitKeys_N_Vals = (obj, update = false) => {
  const keys = Object.keys(obj);
  const undeline_keys = [];
  const vals = Object.values(obj);
  const placeholder = keys.forEach((init, key) => {
    // 获取下划线的属性
    const undeline_key = _strReplaceChar(key);
    undeline_keys.push(undeline_key);
    if (update) {
      init += `${undeline_key} = ?,`;
      return init;
    }
    init += '?,';
    return init;
  }, '');
  return {
    keys,
    vals,
    undeline_keys,
    undeline_keys_str: undeline_keys.join(','),
    keys_str: keys.join(','),
    vals_str: vals.join(','),
    placeholder_question: placeholder.slice(0, placeholder.length),
  }
}

const replaceUnderLine = (key) => {
  return _strReplaceChar(key, '_', true);
}
const replaceUnderLineObj = obj => {
  return Object.keys(obj).reduce((init, key) => {
    // console.log(replaceUnderLine(key));
    init[replaceUnderLine(key)] = obj[key];
    return init;
  }, {});
}
const allTypeReplaceUnderLine = obj => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  switch (type) {
    case 'Object':
      return replaceUnderLineObj(obj);
    case 'Array':
      return obj.map(item => replaceUnderLineObj(item));
    case 'String':
      return replaceUnderLine(obj);
  }
}
/**
 * 
 * @param {Object} obj  原对象
 * @param {String} char  要替换的字符
 * @description 对象下划线转驼峰
 * @return 返回处理后的对象 { about_example: 'example' } { aboutExample: 'example' }
 * @return { Object } obj  
 */
const  filterUnderLine = (obj, char = '_') => {
  const arr =  Object.keys(obj).filter(item => ~item.indexOf(char))
  arr.forEach(item => {
    const val = obj[item]
    const key = underline2Camel(item)
    obj[key] = val
    delete obj[item]
  })
  return obj
}

module.exports = {
  NtNUpdate: update,
  allTypeReplaceUnderLine,
  replaceCamel: fileterCamel,
  // filterUnderLine,
  pojo,
}
