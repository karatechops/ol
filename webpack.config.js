var path = require('path')
var webpack = require('webpack')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }, { 
        test: /\.css$/, 
        loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]', 'postcss-loader']
      }, { 
        test: /\.json$/, 
        loaders: ['json-loader']
      }, {
      test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  resolve: {
    root: path.resolve('./app')
  }
}
