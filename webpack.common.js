const path = require('path');

module.exports = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: ['ts-loader'],
      }
    ]
  },
};