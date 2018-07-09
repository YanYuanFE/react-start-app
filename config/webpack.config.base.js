const path = require('path');

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
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: {
      app: resolve('src'),
      assets: resolve('assets'),
      models: resolve('src/models'),
      utils: resolve('src/utils'),
      layouts: resolve('src/layouts'),
      services: resolve('src/services'),
      components: resolve('src/components'),
    },
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: resolve('src'),
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
              limit: 1000,
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
