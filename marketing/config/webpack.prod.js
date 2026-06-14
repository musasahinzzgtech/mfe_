const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const shared = packageJson.dependencies;
const prodConfig = {
  mode: "production",
  output: {
    filename: "mfe_marketing_[name].[contenthash].js", // template string for the filename
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      /**
       * shared: {
       *   react: { singleton: true },
       *   "react-dom": { singleton: true },
       *   "react-router-dom": { singleton: true },
       * }
       */
      shared,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
