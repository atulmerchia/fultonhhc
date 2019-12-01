require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TerserPlugin = require("terser-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');
const common = require('./webpack-common-config.js');

module.exports = merge(common, {
  entry: {
    vendor: ["react"],
    app: paths.appIndexJs
  },
  mode: "production",
  output: {
    filename: "[chunkhash]_[name].js",
    path: paths.appBuild,
    publicPath: "/"
  },
  plugins: [ new ExtractTextPlugin("styles.css") ],
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.appSrc),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(paths.appSrc)],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: false
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              }
            }
          ]
        })
      }
    ]
  }
});
