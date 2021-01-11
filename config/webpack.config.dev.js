const path = require('path');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {getCommonConfig, resolve} = require('./webpack.config.base');
const getThemeConfig = require('../theme.js');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();

const theme = getThemeConfig();

const mergedConfig = merge(getCommonConfig(true), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    overlay: true,
    // quiet: true,
  },
  module: {
    rules: [
      {
        test: /.less$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
                options: {
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
                loader: "style-loader",
              },
              {
                loader: "css-loader",
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
    // new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: resolve('favicon.ico'),
    }),
  ],
});

// module.exports = smp.wrap(mergedConfig);
module.exports = mergedConfig;
