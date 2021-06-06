const path = require("path");
module.exports = {
  context: process.cwd(),
  entry: {
    entry1: "./src/entry1.js",
    entry2: "./src/entry2.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
};