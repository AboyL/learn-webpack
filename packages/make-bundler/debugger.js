const webpack = require('./webpack');
const options = require('./webpack.config');
const compiler = webpack(options);
// const fs = require('fs-extra')
compiler.run((err, stats) => {
  const output = stats.toJson({
    entries: true,//入口信息
    modules: true,//本次打包有哪些模块
    chunks: true,//代码块
    assets: true,//产出的资源
    files: true //最后生成了哪些文件
  })
  // fs.outputJSONSync('./doc/stats.json', output)
  console.log(output);
});
