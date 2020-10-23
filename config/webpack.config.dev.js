const path = require('path');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const common = require('./webpack.config.base');
const getThemeConfig = require('../theme.js');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const theme = getThemeConfig();

const mergedConfig = merge(common, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: '[local]--[hash:base64:5]',
            // },
          },
        ],
      },
      {
        test: /.less$/,  // antd 中的less
        include: /node_modules/,
        // include: path.resolve(__dirname, 'node_modules/antd'),
        use: 'happypack/loader?id=styles',
        // use: [
        //   {
        //     loader: 'style-loader',
        //   },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       importLoaders: 2,
        //     },
        //   },
        //   {
        //     loader: 'postcss-loader',
        //   },
        //   {
        //     loader: 'less-loader',
        //     options: {
        //       // strictMath: false,
        //       // noIeCompat: true,
        //       javascriptEnabled: true,
        //       modifyVars: theme,
        //     },
        //   },
        // ],
      },
      {
        test: /\.less$/,
        // exclude: path.resolve(__dirname, 'node_modules'),
        include: /src/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
              }
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
      favicon: resolve('favicon.ico'),
    }),
    new HappyPack({
      id: 'styles',
      loaders: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              // strictMath: false,
              // noIeCompat: true,
              javascriptEnabled: true,
              modifyVars: theme,
            }
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ],
});

// module.exports = smp.wrap(mergedConfig);
module.exports = mergedConfig;
