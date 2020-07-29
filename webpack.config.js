const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "production",
  output: {
    path: path.join(__dirname, './build'),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".jpg", ".png"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader?name=/assets/[name].[ext]",
        options: {
          publicPath: '/',
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    })
  ],
};
