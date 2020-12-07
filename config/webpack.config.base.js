const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const getCommonConfig = (isDevelopment) => ({
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name].bundle.js',
  },
  optimization: {
    chunkIds: 'named',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      lodash$: "lodash-es",
      src: resolve('src'),
      assets: resolve('assets'),
      models: resolve('src/models'),
      utils: resolve('src/utils'),
      layouts: resolve('src/layouts'),
      services: resolve('src/services'),
      components: resolve('src/components'),
      common: resolve('src/common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
      lintDirtyModulesOnly: true,
    }),
    // new HappyPack({
    //   id: 'jsx',
    //   loaders: [{
    //     loader: 'babel-loader',
    //     options: {
    //       cacheDirectory: true,
    //       plugins: [
    //         isDevelopment && require.resolve('react-refresh/babel'),
    //       ].filter(Boolean),
    //     },
    //   }],
    //   threadPool: happyThreadPool,
    //   verbose: true,
    // }),
    new AntdDayjsWebpackPlugin(),
    new ReactRefreshPlugin(),
  ]
});

module.exports = {
  getCommonConfig,
  resolve,
}
