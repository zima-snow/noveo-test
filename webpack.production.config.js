const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'assets/js/[name].[chunkhash].js',
    path: path.join(__dirname, '/www'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react', 'stage-0'],
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
          {
            loader: 'less-loader',
            options: {
              imagePath: '~../www/assets/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react$: path.resolve('./node_modules/react/'),
    },
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './resources/index.template.ejs',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
