const path = require("path");
module.exports = {
  context: __dirname,
  mode: 'development',
  devtool: false,
  entry: {
    entry1: "./src/entry1.js",
    entry2: "./src/entry2.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
};