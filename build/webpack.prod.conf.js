var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');

var clean = require('clean-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = merge(baseConfig, {
  entry: {
    common: ['react', 'react-router']
  },
  output: {
    path: resolve('dist'),
    filename: '[name]-[chunkhash].min.js'
  },
  plugins: [
    new clean(['../dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[chunkhash].min.js',
      chunks: ['browser', 'mobile']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest-[chunkhash].min.js',
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'app/entry/index.html',
      filename: 'index.html',
      chunks: ['common', 'browser', 'ieCompatible'],
      chunksSortMode: function (chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true,
        processConditionalComments: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'app/entry/index-h5.html',
      filename: 'index-h5.html',
      chunks: ['common', 'mobile', 'flexible'],
      chunksSortMode: function (chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new InlineManifestWebpackPlugin(),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    })
  ]
});