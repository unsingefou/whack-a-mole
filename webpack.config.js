var webpack = require("webpack");
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      stylesheets: path.resolve(__dirname, 'app/assets/stylesheets/')
    },
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ]
  },
  plugins: [],
  module: {
		loaders: []
	},
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: 'index.js'
  }
}
