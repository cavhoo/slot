const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: [
    './src/main.ts'
  ],
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8080
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/**/*'
        }
      ]
    })
  ]
};
