import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { HotModuleReplacementPlugin } from 'webpack'

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    port: 6066,
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HotModuleReplacementPlugin()
  ]
}

export default [config]
