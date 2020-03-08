const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const replaceValue = options.replaceValue || '行知李'
  return source.replace(/李行知/g, replaceValue)
}