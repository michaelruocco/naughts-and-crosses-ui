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
      APP_COGNITO_ENDPOINT_URL: JSON.stringify('http://cognito:9229'),
      APP_COGNITO_CLIENT_ID: JSON.stringify('6b0j5hb1u25z290vv502lfl1c'),
      APP_COGNITO_REGION_NAME: JSON.stringify('eu-central-1'),
      APP_AWS_ACCESS_KEY_ID: JSON.stringify('abc'),
      APP_AWS_SECRET_ACCESS_KEY: JSON.stringify('123'),
      APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      APP_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    }),
  ],
});
