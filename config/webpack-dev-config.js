const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack-common-config.js');

module.exports = merge(common, {
  entry: [paths.appIndexJs],
  mode: "development",
  devtool: "eval",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.appSrc),
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "10"
                  }
                }
              ],
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(paths.appSrc)],
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  }
});
