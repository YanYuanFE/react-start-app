const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/index.js",
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      src: resolve("src"),
      assets: resolve("assets"),
      models: resolve("src/models"),
      utils: resolve("src/utils"),
      layouts: resolve("src/layouts"),
      services: resolve("src/services"),
      components: resolve("src/components"),
      common: resolve("src/common")
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        include: /src/,
        enforce: "pre",
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader?name=i/[name].[ext]"
      }
    ]
  }
};
