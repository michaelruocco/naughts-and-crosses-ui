const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
  lightweightTags: true,
  commithashCommand: 'rev-parse --short HEAD',
});

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      APP_API_BASE_URL: JSON.stringify('/api'),
      APP_WEB_SOCKET_BASE_URL: JSON.stringify('/web-socket'),
      APP_AUTH_URL: JSON.stringify('$APP_AUTH_URL'),
      APP_AUTH_REALM: JSON.stringify('$APP_AUTH_REALM'),
      APP_AUTH_CLIENT_ID: JSON.stringify('$APP_AUTH_CLIENT_ID'),
      APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      APP_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    }),
  ],
});
