const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const projectRoot = process.cwd()
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(projectRoot, 'src/pages/*/index.js'))

  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(/src\/pages\/(.*)\/index.js/)
    const entryFileName = match && match[1]
    entry[entryFileName] = entryFile

    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/pages/${entryFileName}/index.html`),
      filename: `${entryFileName}.html`,
      chunks: [entryFileName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }))
  })
  return {
    entry,
    htmlWebpackPlugins,
  }
}
const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  mode: "production",
  entry: entry,
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /\.less$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      }, {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins,
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
}
