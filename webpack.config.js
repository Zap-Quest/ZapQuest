const webpack = require('webpack');
const DotenvWebpackPlugin = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  plugins: [
		new NodePolyfillPlugin(),
    new DotenvWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
	],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ],    
  }
};
