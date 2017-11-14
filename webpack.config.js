const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob');

console.log( encodeURIComponent(process.env.type) );

var website = {
  publicPath: 'http://127.0.0.1:3000/'
}

if (process.env.type == 'build') {
  var website = {
    publicPath: 'http://127.0.0.1:3000/'
  }
}

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[app].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      'common': resolve('src/common'),
      'api': resolve('src/api'),
    }
  },
  module: {
    rules: [{
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        }),
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        }),
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 50000,
            outputPath: 'images/'
          }
        }]
      }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        remoAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.html')),
    // }),
    new uglify()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: 3000,
    publicPath: website.publicPath
  }
}
