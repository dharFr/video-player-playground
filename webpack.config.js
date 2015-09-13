path = require('path');

projectPath = path.join(__dirname, '.');
bowerPath   = path.join(projectPath, 'bower_components');
nodePath    = path.join(projectPath, 'node_modules');

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
      bowerPath
    ],
    alias: {
      'mixin'     : path.join(projectPath, 'src', 'mixin'),
      'redux'     : path.join(nodePath, 'redux'),
      'with-state': path.join(
        'flight-with-state',
        require('./bower_components/flight-with-state/bower.json').main
      )
    }
  },
  module: {
    loaders:[
      // Babel loader
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