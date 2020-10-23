const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const common = require('./webpack.config.base');
const getThemeConfig = require('../theme.js');

const theme = getThemeConfig();

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const vendorGroups = {
  polyfill: /babel|core-js/,
  core: /react|redux|router|history|axios/,
  utils: /moment|lodash/,
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: 'warning',
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            let packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace("@", "");

            for (const groupKey in vendorGroups) {
              if (vendorGroups[groupKey].test(packageName)) {
                packageName = groupKey;
                break;
              }
            }
            return `vendor~${packageName}`;
          },
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js($|\?)/i,
        include: /\/src/,
        parallel: true,
        terserOptions: {
          ie8: false,
          ecma: 8,
        },
      }),
    ],
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
          'postcss-loader',
        ],
      },
      {
        test: /.less$/,  // antd 中的less
        include: resolve('node_modules'),
        // exclude: [/src/],
        // include: path.resolve(__dirname, 'node_modules/antd'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
                modifyVars: theme,
              }
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: resolve('src'),
        // exclude: [/node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
                modifyVars: theme,
              }
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
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: 'favicon.ico',
      chunks: ['app', 'vendor', 'manifest'],
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
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new BundleAnalyzerPlugin(),
  ],
});
