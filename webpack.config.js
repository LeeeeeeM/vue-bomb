const path = require('path')
const yargs = require('yargs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const mode = yargs.argv.mode || 'development'

const mod = module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/main.js')
  },
  mode: mode,
  output: {
    path: path.resolve(__dirname, 'example'), 
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: [
          /node_modules/
        ]
      }, {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '9091'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      inject: true,
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin()
  ],
  externals: {
    
  }
}

if (mode === 'production') {
  mod.externals['vue'] = 'Vue'
}