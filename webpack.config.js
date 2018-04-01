const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    devServerClient: 'webpack-dev-server/client?http://localhost:3001',
    index: ['webpack/hot/only-dev-server', 'react-hot-loader/patch', './src/index'],
  },
  output: {
    filename: 'assets/js/[name].js',
    path: path.join(__dirname, '/www'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, '/www'),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['env', { modules: false }], 'react', 'stage-0'],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
