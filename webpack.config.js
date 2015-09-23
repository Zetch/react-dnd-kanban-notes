var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var htmlPlugin = require('html-webpack-plugin');

// Defaults

var TARGET = process.env.npm_lifecycle_event;
var ROOT = path.resolve(__dirname);

var common = {

  entry: path.resolve(ROOT, 'app'),

  resolve: ['', '.js', '.jsx'],

  output: {
    path: path.resolve(ROOT, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css'], include: path.resolve(ROOT, 'app') }
    ]
  }
};

// Development

if (TARGET === 'start' || !TARGET) {

  module.exports = merge(common, {

    devtool: 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },

    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.resolve(ROOT, 'app') }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new htmlPlugin({ title: 'Kanban App' })
    ]

  });

// Production

} else {

  module.exports = common;

}