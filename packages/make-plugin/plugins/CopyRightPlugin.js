class CopyRightPlugin {

  constructor(options) {
    console.log(options)
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('CopyRightPlugin', (compilation, cb) => {
      console.log(compilation.assets)
      compilation.assets['CopyRight.txt'] = {
        source: () => '123',
        size: () => 3
      }
      cb()
    })
  }
}

module.exports = CopyRightPlugin