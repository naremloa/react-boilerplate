import { Configuration } from 'webpack';
import Webpackbar from 'webpackbar';
// @ts-ignore
import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { loader as MiniCssExtractPluginLoader } from 'mini-css-extract-plugin';

import {
  __DEV__,
  PROJECT_NAME,
  PROJECT_ROOT,
  resolvePath
} from '../utils';

function setCssLoaders(importLoaders: number = 0) {
  return [
    __DEV__ ? 'style-loader' : MiniCssExtractPluginLoader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: true,
        // 指定在 css-loader 之前，使用的 loader 數量
        importLoaders,
      },
    },
    // {
    //   loader: 'postcss-loader',
    //   options: {
    //     sourceMap: true,
    //   },
    // },
  ];
}

const webpackCommon: Configuration = {
  context: PROJECT_ROOT,
  entry: resolvePath('./src/index.tsx'),
  output: {
    publicPath: '/',
    path: resolvePath('./dist'),
    filename: 'js/[name].[chunkhash].bundle.js',
    // 加盐 hash
    hashSalt: PROJECT_NAME || 'little_pony',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      // // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
      // 'react-dom': '@hot-loader/react-dom',
      '@': resolvePath('./src'),
  },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: setCssLoaders(0),
      },
    ],
  },
  plugins: [
    new Webpackbar({
      name: PROJECT_NAME,
      color: '#75cabe',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolvePath('./public/index.html'),
      // 這邊展開來寫，主要是為了導入 PUBLIC_PATH 這個變數
      templateParameters: (compilation, assets, assetTags, options) => ({
        compilation,
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
          tags: assetTags,
          files: assets,
          options
        },
        PUBLIC_PATH:((webpackCommon.output?.publicPath || '/') as string)
          .replace(/\/$/, ''),
      }),
    }),
  ],
};

export default webpackCommon;