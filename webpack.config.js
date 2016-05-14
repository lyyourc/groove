const path = require('path')

const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
}

// common config
const common = {
  entry: [
    PATHS.src
  ],

  output: {
    path: PATHS.build,
    filename: 'build.js'
  },
  
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: './index.html',
    })
  ],

  module: {
    loaders: [
      {
        loaders: ['style', 'css'],
        test: /\.css$/,
        include: PATHS.src
      },
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: /node_modules/
      }
    ]
  }
}

// for dev env
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: '#inline-source-map',
    debug: true,

    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: 'localhost',
      port: '3000'
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'eval'
  })
}

if (TARGET === 'test') {
  module.exports = common
}
