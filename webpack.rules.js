const path = require('path');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    exclude: /(.webpack|node_modules)/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(jpg|png|svg|ico|icns)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
];
