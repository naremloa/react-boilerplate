import { HotModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import webpackCommon from './webpack.common';

const webpackDev = merge(webpackCommon, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
})

export default webpackDev;
