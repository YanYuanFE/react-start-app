const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob');

var website = {
  publicPath: 'http://127.0.0.1:3000/'
}

if (process.env.type == 'build') {
  var website = {
    publicPath: 'http://127.0.0.1:3000/'
  }
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'axios']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
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
        use: [{
          loader: 'eslint-loader',
          options: { fix: true }
        }],
        include: path.resolve(__dirname, './src/**/*.js'),
        exclude: /node_modules/
      }, {
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
    new CleanWebpackPlugin(['dist/app.*.js', 'dist/manifest.*.js'], {
      verbose: true,
      dry: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
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
    new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: 3000,
    publicPath: website.publicPath
  }
}
