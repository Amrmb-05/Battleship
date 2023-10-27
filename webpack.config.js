const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    player: "./src/player.js",
    board: "./src/gameBoard.js",
    dom: "./src/dom.js",
    game: "./src/game.js",
    app: "./src/app.js",
  },
  devtool: "inline-source-map",
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     inject: false,
  //   }),
  // ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
