const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config({
  path: resolve(__dirname, './config/.env')
});

module.exports = (env) => {
  console.log(env)
  return {
    // mode 当前的运行模式  开发环境  生产环境 不指定环境
    mode: process.env.NODE_ENV,
    devtool: 'hidden-source-map',
    entry: {
      main: './src/index.js',
    },
    output: {
      path: resolve(__dirname, 'dist'), // 输出文件夹的绝对路径
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ["@babel/preset-env", {
                    "useBuiltIns": "usage",
                    "corejs": 3,
                    targets: { chrome: 40 }
                  }],
                ],
              },
            },
          ],
        },
        {
          test: /\.png?$/,
          type: 'asset/resource'
        },
        // {
        //   test: /\.css$/, use: [
        //     'style-loader',
        //     'css-loader',
        //   ]
        // },
        {
          test: /\.less$/, use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV222': JSON.stringify('development222'),
      }),
    ],
  }
}
