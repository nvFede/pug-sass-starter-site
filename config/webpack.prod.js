const {
  merge
} = require("webpack-merge");
const commonConfig = require("./webpack.common");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const __ROOT__ = process.cwd();

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new MiniCSSExtractPlugin({
      path: path.resolve(__ROOT__, "build/"),
      filename: "css/[name].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
      canPrint: true,
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__ROOT__, "src/assets/images"),
        to: path.resolve(__ROOT__, "build/images"),
        globOptions: {
          ignore: ["*.DS_Store"],
        },
      }, ],
    }),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
});