var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    browser: [
      resolve('app/entry/App.js')
    ],
    ieCompatible: resolve('app/utils/ie-compatible.js'),
    mobile: [
      resolve('app/entry/App-h5.js')
    ],
    flexible: resolve('app/utils/flexible.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve('app'),
      resolve('node_modules')
    ],
    alias: {
      app: resolve('app'),
      assets: resolve('app/assets'),
      components: resolve('app/components'),
      pages: resolve('app/pages'),
      utils: resolve('app/utils'),
      actions: resolve('app/actions'),
      reducers: resolve('app/reducers'),
      constants: resolve('app/constants'),
      services: resolve('app/services')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'es3ify-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
         test: /\.js?$/,
         exclude: /node_modules|lib/,
         loader: 'eslint-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },
      {
        test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader?name=i/[name].[ext]'
      }]
  }
};
