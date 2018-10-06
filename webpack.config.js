const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['babel-polyfill','./src/index.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
      loaders: [
        {
          test: [/\.js$/],
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2017'],
            plugins: ['transform-class-properties']
          }
        },
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    devServer: {
      contentBase: './public',
      hot: true
    },
    plugins: [

      new webpack.HotModuleReplacementPlugin()
    ]
  }