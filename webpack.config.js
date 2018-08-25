module.exports = {
    entry: ['babel-polyfill','./src/index.js'],
    output: {
      filename: "./public/bundle.js"
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
    }
  }