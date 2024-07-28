const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
  lightweightTags: true,
  commithashCommand: 'rev-parse --short HEAD',
});
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const defaultUrl = 'http://localhost:3002';
const apiBaseUrl = env['APP_API_BASE_URL'] || defaultUrl;
const webSocketBaseUrl = env['APP_WEB_SOCKET_BASE_URL'] || defaultUrl;
const loginUrl = env['APP_LOGIN_URL'] || '';

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
      APP_API_BASE_URL: JSON.stringify(apiBaseUrl),
      APP_WEB_SOCKET_BASE_URL: JSON.stringify(webSocketBaseUrl),
      APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      APP_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
      APP_LOGIN_URL: JSON.stringify(loginUrl),
    }),
  ],
});
