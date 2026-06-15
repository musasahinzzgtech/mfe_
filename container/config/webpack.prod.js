const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const shared = packageJson.dependencies;
const prodConfig = {
  mode: "production",
  output: {
    filename: "mfe_container_[name].[contenthash].js", // template string for the filename
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${process.env.PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`,
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
