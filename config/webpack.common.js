const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const __ROOT__ = process.cwd();


const fs = require("fs");

let templates = [];
let dir = "src";
let files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.match(/\.pug$/)) {
    let filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        template: dir + "/" + filename + ".pug",
        filename: filename + ".html",
        hash: true,
      })
    );
  }
});

module.exports = {
  entry: path.resolve(__ROOT__, "src/js/index.js"),
  output: {
    path: path.resolve(__ROOT__, "build"),
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].chunk.js",
  },
  plugins: [new CleanWebpackPlugin(), ...templates],
  module: {
    rules: [{
        test: /\.pug$/,
        use: [{
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            configFile: path.resolve(__ROOT__, "config/babel.config.js"),
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
};