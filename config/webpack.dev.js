const {
  merge
} = require("webpack-merge");
const commonConfig = require("./webpack.common.js");


module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build",
    compress: true,
    port: 3001,
    overlay: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    }, ],
    rules: [{
      test: /\.s[ac]ss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    }, ],
  },
});