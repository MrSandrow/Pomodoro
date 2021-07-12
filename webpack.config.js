const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { index: './src/js/events/index.js' },
  output: { filename: '[name].[contenthash].js', path: path.resolve('public') },

  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve('src', 'pages'),
        use: 'html-loader',
      },
      {
        test: /\.scss$/,
        include: path.resolve('src', 'styles'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        include: path.resolve('src', 'js'),
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'], cacheDirectory: true } },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        include: path.resolve('src', 'images'),
        type: 'asset/resource',
      },
      {
        test: /\.ttf$/,
        include: path.resolve('src', 'fonts'),
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
    new HtmlWebpackPlugin({ template: path.resolve('src', 'pages', 'index.html'), chunks: ['index'] }),
  ],

  devServer: {
    contentBase: path.resolve('public'),
    host: '127.0.0.1',
    port: 5500,
    open: true,
    clientLogLevel: 'none',
  },
};
