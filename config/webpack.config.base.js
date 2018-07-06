const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getThemeConfig = require('../theme.js');

const theme = getThemeConfig();
const devMode = process.env.NODE_ENV !== 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve('dist'),
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      resolve('app'),
      resolve('node_modules'),
    ],
    alias: {
      app: resolve('src'),
      models: resolve('src/models'),
      utils: resolve('src/utils'),
      layouts: resolve('src/layouts'),
      pages: resolve('src/pages'),
      constants: resolve('src/constants'),
      components: resolve('src/components'),
    },
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              // localIdentName: '[local]--[hash:base64:5]',
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
              sourceMap: true,
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
      {
        test: /.less$/,  // antd 中的less
        include: path.resolve(__dirname, 'node_modules/antd'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modules: false,
              javascriptEnabled: true,
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?name=i/[name].[ext]',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
};
