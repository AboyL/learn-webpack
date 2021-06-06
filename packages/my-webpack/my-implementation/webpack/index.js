const Compiler = require('./Compiler')

const defaultConfig = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
}

const webpack = (config) => {
  let shellConfig = process.argv.slice(2).reduce((shellConfig, item) => {
    let [key, value] = item.split('=');//item='--mode=development',
    shellConfig[key.slice(2)] = value;
    return shellConfig;
  }, {});
  let finalConfig = {
    ...defaultConfig,
    ...config,
    ...shellConfig
  };//得出最终的配置对象

  //2.用上一步得到的参数初始化Compiler对象
  const compiler = new Compiler(finalConfig)
  // 3. 处理plugin
  if (finalConfig.plugins) {
    for (let plugin of finalConfig.plugins) {
      plugin.apply(compiler)
    }
  }
  return compiler
}
module.exports = webpack