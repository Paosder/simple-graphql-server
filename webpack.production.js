const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge.merge(common, {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'src/main.ts')],
  externals: [nodeExternals({})],
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  // terser plugin enabled default in v5.
});
