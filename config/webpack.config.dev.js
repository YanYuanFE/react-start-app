const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.base');
const getThemeConfig = require('../theme.js');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const theme = getThemeConfig();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              // localIdentName: '[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /.less$/,  // antd 中的less
        exclude: [/src/],
        // include: path.resolve(__dirname, 'node_modules/antd'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: false,
              noIeCompat: true,
              javascriptEnabled: true,
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: resolve('node_modules'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: false,
              noIeCompat: true,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: resolve('favicon.ico'),
    }),
  ],
});
