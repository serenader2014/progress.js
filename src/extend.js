/* eslint-disable no-param-reassign */

export default function extend(source, ...list) {
  if (!list || !source || typeof source !== 'object') { return {} }
  list.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        source[key] = extend({}, source[key], obj[key])
      } else {
        source[key] = obj[key]
      }
    })
  })
  return source
}
