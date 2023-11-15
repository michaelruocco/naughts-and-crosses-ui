const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      APP_API_BASE_URL: JSON.stringify('/api'),
      APP_WEB_SOCKET_BASE_URL: JSON.stringify('/web-socket')
    }),
  ],
});
