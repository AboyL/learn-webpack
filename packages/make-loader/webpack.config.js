const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  resolveLoader: {
    modules: ['node_modules', './loaders'],
  },
  module: {
    rules: [{
      test: /\.js/,
      use: [{
        // loader: path.resolve(__dirname, './loaders/repalce-loader.js'),
        loader: 'repalce-loader',
        options: {
          replaceValue: '行知李'
        }
      }]
    }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}