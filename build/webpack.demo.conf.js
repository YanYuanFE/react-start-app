var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

Object.keys(baseConfig.entry).forEach(function(name) {
  baseConfig.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(baseConfig.entry[name]);
});

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/entry/index.html',
      filename: 'index.html',
      inject: false,
      chunks: ['browser', 'ieCompatible']
    }),
    new HtmlWebpackPlugin({
      template: 'app/entry/index-h5.html',
      inject: false,
      filename: 'index-h5.html',
      chunks: ['mobile', 'flexible']
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('demo')
    })
  ]
})