// import { Compiler, MultiCompiler } from 'webpack';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackDev from '../config/webpack.dev';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function webpackMiddleware(compiler: webpack.Compiler) {
  const publicPath = (webpackDev.output?.publicPath || '/') as string;

  const devMiddlewareOptions: webpackDevMiddleware.Options = {
    // 保持和 webpack 中配置一致
    publicPath,
    // 只在发生错误或有新的编译时输出
    stats: 'minimal',
    // 需要输出文件到磁盘可以开启
    // writeToDisk: true
  };


  return [
    // @ts-ignore
    webpackDevMiddleware(compiler, devMiddlewareOptions),
  ];
}
