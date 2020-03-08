const path = require('path')
const CopyRightPlugin = require('./plugins/CopyRightPlugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    new CopyRightPlugin({
      test: '1'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}