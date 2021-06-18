const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve('public'),
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve('src', 'pages'),
        use: ['extract-loader', { loader: 'html-loader', options: { sources: false } }],
        type: 'asset/resource',
        generator: { filename: '[name][ext]' },
      },
      {
        test: /\.scss$/,
        include: path.resolve('src', 'styles'),
        use: ['extract-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        type: 'asset/resource',
        generator: { filename: 'style.css' },
      },
      {
        test: /\.js$/,
        include: path.resolve('src', 'js'),
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'], cacheDirectory: true } },
      },
    ],
  },

  devServer: {
    contentBase: path.resolve('public'),
    host: '127.0.0.1',
    port: 5500,
    open: true,
    clientLogLevel: 'none',
  },
};
