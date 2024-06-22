const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
  lightweightTags: true,
  commithashCommand: 'rev-parse --short HEAD',
});

const baseUrl = 'http://localhost:3002';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3001,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      APP_API_BASE_URL: JSON.stringify(baseUrl),
      APP_WEB_SOCKET_BASE_URL: JSON.stringify(baseUrl),
      APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      APP_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    }),
  ],
});
