var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    preLoaders: [
      { test: /\.css$/, loaders: ['csslint'], include: path.resolve(ROOT, 'app') },
      { test: /\.jsx?$/, loaders: ['eslint'], include: path.resolve(ROOT, 'app') }
    ]
  },

  plugins: [
    new HtmlPlugin({ title: 'Kanban App' })
  ]

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
        { test: /\.css$/, loaders: ['style', 'css'], include: path.resolve(ROOT, 'app') },
        { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.resolve(ROOT, 'app') }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]

  });

// Production

} else if (TARGET === 'build') {

  module.exports = merge(common, {

    entry: {
      app: path.resolve(ROOT, 'app'),
      vendor: Object.keys(pkg.dependencies)
    },

    output: {
      path: path.resolve(ROOT, 'build'),
      filename: '[name].js?[chunkhash]'
    },

    devtool: 'source-map',

    module: {
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), include: path.resolve(ROOT, 'app') },
        { test: /\.jsx?$/, loaders: ['babel'], include: path.resolve(ROOT, 'app') }
      ]
    },

    plugins: [
      new CleanPlugin(['build']),
      new ExtractTextPlugin('styles.css?[chunkhash]'),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor', '[name].js?[chunkhash]'
      ),
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })

} else {

  module.exports = common;

}