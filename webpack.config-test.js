var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
 	module: {
  	loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }, { 
        test: /\.css$/, 
        loaders: ['null-loader']
      }, { 
        test: /\.json$/, 
        loaders: ['json-loader']
      }, {
        test: /\.(jpg|png|gif)$/,
        loaders: ['null-loader']
      },
    ]
  },
  resolve: {
    root: path.resolve('./app')
  }
};