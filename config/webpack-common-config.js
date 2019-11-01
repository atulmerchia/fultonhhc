require('dotenv').config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const paths = require("./paths");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL)
      }
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
    alias: {
      components: path.resolve(paths.appSrc, "components"),
      pages: path.resolve(paths.appSrc, "pages"),
      css: path.resolve(paths.appSrc, "css"),
      assets: path.resolve(paths.appAssets, "assets"),
      lib: path.resolve(paths.appSrc, "lib")
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
