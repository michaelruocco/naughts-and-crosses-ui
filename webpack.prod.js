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
      APP_COGNITO_ENDPOINT_URL: JSON.stringify('$APP_COGNITO_ENDPOINT_URL'),
      APP_COGNITO_CLIENT_ID: JSON.stringify('$APP_COGNITO_CLIENT_ID'),
      APP_COGNITO_REGION_NAME: JSON.stringify('$APP_COGNITO_REGION_NAME'),
      APP_AWS_ACCESS_KEY_ID: JSON.stringify('$APP_AWS_ACCESS_KEY_ID'),
      APP_AWS_SECRET_ACCESS_KEY: JSON.stringify('$APP_AWS_SECRET_ACCESS_KEY'),
      APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      APP_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    }),
  ],
});
