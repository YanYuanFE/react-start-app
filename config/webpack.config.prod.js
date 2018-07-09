const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.config.base');

const getThemeConfig = require('../theme.js');

const theme = getThemeConfig();

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'postcss-loader'
        ],
      },
      {
        test: /.less$/,  // antd 中的less
        exclude: [/src/],
        // include: path.resolve(__dirname, 'node_modules/antd'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          'postcss-loader',
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              importLoaders: 2,
              sourceMap: true,
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
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dist')]),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: 'favicon.ico',
      chunks: ['app'],
      chunksSortMode: function(chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /\/node_modules/,
      sourceMap: true,
    }),
  ],
});
