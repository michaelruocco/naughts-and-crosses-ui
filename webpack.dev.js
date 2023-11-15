const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

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
      APP_WEB_SOCKET_BASE_URL: JSON.stringify(baseUrl)
    }),
  ],
});
