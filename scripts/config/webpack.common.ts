import { Configuration } from 'webpack';
import {
  PROJECT_NAME,
  PROJECT_ROOT,
  resolvePath
} from '../utils';

const webpackCommon: Configuration = {
  context: PROJECT_ROOT,
  entry: resolvePath('./src/index.tsx'),
  output: {
    publicPath: '/',
    path: resolvePath('./dist'),
    filename: 'js/[name]-[hash].bundle.js',
    // 加盐 hash
    hashSalt: PROJECT_NAME || 'cat',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
};

export default webpackCommon;