const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/[name].[hash].js',
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
        use: 'happypack/loader?id=jsx',
        // use: [
        //   {
        //     loader: 'thread-loader',
        //   },
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       cacheDirectory: true,
        //     },
        //   },
        // ],
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
    new HappyPack({
      id: 'jsx',
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new AntdDayjsWebpackPlugin(),
  ]
};
