import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'
import { join } from 'path'

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'docs')
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
        enforce: 'pre',
        exclude: /(node_modules|docs|test|\.spec\.js)/,
        use: [
          {
            loader: 'webpack-strip-block',
            options: {
              start: 'DEV-START',
              end: 'DEV-END'
            }
          }
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
