const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StartPlugin = require('./plugins/start-plugin')
const DonePlugin = require('./plugins/done-plugin')
const EmitPlugin = require('./plugins/emit-plugin');

module.exports = {
  mode: "development",
  context: process.cwd(),
  entry: {
    entry1: "./test-code/index.js",
    entry2: "./test-code/index2.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'loaders', 'logger1-loader.js'),
          path.resolve(__dirname, 'loaders', 'logger2-loader.js'),
        ]
      }
    ]
  },
  plugins: [
    new StartPlugin(),
    new DonePlugin(),
    new EmitPlugin()
  ],
  devServer: {},
};