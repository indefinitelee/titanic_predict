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
            presets: ['react', 'es2017']
          }
        },
        // {
        //   test: /\.css$/,
        //   exclude: /node_modules/,
        //   loader: 'style-loader'
        // }, 
        // {
        //   test: /\.css$/,
        //   exclude: /node_modules/,
        //   loader: 'css-loader',
        //   query: {
        //     modules: true,
        //     localIdentName: '[name]__[local]___[hash:base64:5]'
        //   }
        // }
      ]
    },
    resolve: {
      extensions: ['.js']
    }
  }