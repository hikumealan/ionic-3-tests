var webpack = require('webpack');
var path = require('path');
const helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?module=commonjs,noEmitHelpers=true,compilerOptions{}=removeComments:true',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs=false'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        enforce: 'post',
        test: /\.(ts)$/, loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/(ionic-angular)|angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, root('./src'),{})
  ]
};

function root(localPath) {
  return path.resolve(__dirname, localPath);
}
