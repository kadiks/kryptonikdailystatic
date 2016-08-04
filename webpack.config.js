var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var JS_BUILD_DIR = path.resolve(__dirname, 'js');
var APP_DIR = path.resolve(__dirname, 'app');
var LESS_DIR = path.resolve(__dirname, 'less');
var CSS_BUILD_DIR = path.resolve(__dirname, 'css');

var extractLess = new ExtractTextPlugin('less/[name].less');

var config = {
  entry: [
    APP_DIR + '/index.js',
    LESS_DIR + '/app.less'
  ],
  output: {
    path: JS_BUILD_DIR,
    filename: '/app.js'
  },
  module : {
    loaders : [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
        //loader: extractLess.extract(['css', 'less'])
      }, {
        test: /\.(woff|eot|ttf|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    //extractLess
    new ExtractTextPlugin("../css/app.css", {allChunks: false})
  ]
};

module.exports = config;
