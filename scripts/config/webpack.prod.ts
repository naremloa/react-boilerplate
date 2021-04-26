import { merge } from 'webpack-merge';
// import Webpackbar from 'webpackbar';
// import { BannerPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsWebpackPlugin  from 'optimize-css-assets-webpack-plugin';
import TerserWebpackPlugin  from 'terser-webpack-plugin';
import SizePlugin from 'size-plugin';
import webpackCommon from './webpack.common';
// import { PROJECT_NAME } from '../utils';

const webpackProd = merge(webpackCommon, {
  mode: 'production',
  plugins: [
    // new Webpackbar({
    //   name: PROJECT_NAME,
    //   color: '#75cabe',
    // }),
    // new BannerPlugin({
    //   raw: true,
    //   banner: COPYRIGHT,
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: false,
    }),
    new SizePlugin({ writeFile: false }),
  ],
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [
      // @ts-ignore
      new TerserWebpackPlugin({
        extractComments: false,
      }),
      // @ts-ignore
      new OptimizeCssAssetsWebpackPlugin(),
    ],
  },
});

export default webpackProd;
