import { HotModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';
// @ts-ignore
import WebpackDashboardPlugin from 'webpack-dashboard/plugin';
import webpackCommon from './webpack.common';
import { HMR_PATH } from "../utils";

const webpackDev = merge(webpackCommon, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new WebpackDashboardPlugin(),
    new HotModuleReplacementPlugin(),
  ],
  // optimization: {
  //   moduleIds: 'named',
  // },
});

(webpackDev.entry as string[]).unshift(
  `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`,
);

export default webpackDev;
