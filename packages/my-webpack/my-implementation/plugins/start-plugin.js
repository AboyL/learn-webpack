class StartPlugin {
  apply (compiler) {
    compiler.hooks.run.tap('startPlugin', () => {
      console.log('startPlugin')
    });
  }
}

module.exports = StartPlugin