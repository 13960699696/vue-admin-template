/**
 * 判断字符串是否是https?:|mailto:|tal: 开头的
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证用户名
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
  return reg.test(str);
}

/**
 * 验证密码
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  var reg = /^[a-zA-Z0-9]{4,10}$/;
  return reg.test(str);
}
