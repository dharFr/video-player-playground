path = require('path');

projectPath =  path.join(__dirname, '.');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    sourceMapFilename: "[file].map?[hash]"
  },
  debug: true,
  devtool: 'source-map',
  resolve: {
    root: [
      path.join(projectPath, 'node_modules')
    ]
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  externals:{
    jquery: 'jQuery'
  }
};