const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {getCommonConfig, resolve} = require('./webpack.config.base');
const getThemeConfig = require('../theme.js');

const theme = getThemeConfig();

const vendorGroups = {
  polyfill: /babel|core-js/,
  core: /react|redux|router|history|dva/,
  utils: /dayjs|lodash/,
}

module.exports = merge(getCommonConfig(false), {
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
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false,
                  publicPath: "../",
                },
              },
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  esModule: false,
                  modules: {
                    localIdentName: "[local]--[contenthash:base64:5]",
                  },
                },
              },
              {
                loader: "postcss-loader",
              },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    strictMath: false,
                    noIeCompat: true,
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
          {
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                },
              },
              {
                loader: "postcss-loader",
              },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    strictMath: false,
                    noIeCompat: true,
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
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
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new BundleAnalyzerPlugin(),
  ],
});
