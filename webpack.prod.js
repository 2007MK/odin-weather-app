const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
