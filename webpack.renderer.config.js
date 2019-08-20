const Dotenv = require('dotenv-webpack');

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: require('./webpack.rules'),
  },
};
