const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**@type {import('webpack').Configuration} */
module.exports = {
  devServer: {
    port: 3000
  },
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  stats: 'errors-warnings',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
