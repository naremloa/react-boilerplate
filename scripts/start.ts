import express from 'express';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import webpack from 'webpack';
import WebpackOpenBrowser from 'webpack-open-browser';
import webpackDev from './config/webpack.dev';
import {
  DEFAULT_HOST,
  DEFAULT_PORT,
  getPort,
  ENABLE_OPEN,
} from "./utils";

const handleOpenUrl = (_OPEN: true | string) => (baseURL: string = ''): string => {
  let result =_OPEN as string;
    // 如果 _OPEN 是 ture 則手動抓路徑
  if (_OPEN === true) {
    const publicPath = (webpackDev.output?.publicPath || '/') as string;
    // 沒有子路徑，不做其他處理
    if (publicPath === '/') return baseURL;
    // openAddress = `${ADDRESS}${publicPath.startsWith('/') ? '' : '/'}${publicPath}${publicPath.endsWith('/') ? '' : '/'
    return `${baseURL}${publicPath.replace(/^\b(?!(\/))/, '/')}`
  }
  // 如果 _OPEN 是 string 則直接開啟
  return result;
}

async function start() {
  const PORT = await getPort(DEFAULT_HOST, DEFAULT_PORT);
  const ADDRESS = `http://${DEFAULT_HOST}:${PORT}`;
  const url = handleOpenUrl(ENABLE_OPEN)(ADDRESS)
  webpackDev.plugins!.push(new WebpackOpenBrowser({ url }));

  const devServer = express();
  // 加載 webpack 配置，獲取 compiler
  const compiler = webpack(webpackDev);
  // setupMiddlewares(devServer, compiler);
  const httpServer = devServer.listen(PORT, DEFAULT_HOST, () => {
    console.log(
      `DevServer is running at ${chalk.magenta.underline(ADDRESS)} ${logSymbols.success}`,
    );
  })

  // ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
  //   process.on(signal, () => {
  //       // 先关闭 devServer
  //       httpServer.close();
  //       // 在 ctrl + c 的时候随机输出 'See you again' 和 'Goodbye'
  //       console.log(
  //           chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`),
  //       );
  //       // 退出 node 进程
  //       process.exit();
  //   });
  // });
}

if (require.main === module) {
  // this module was run directly from the command line
  start();
}