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
import setupMiddlewares from './middlewares';

const handleOpenUrl = (_OPEN: true | string) => (baseURL: string = ''): string => {
  let result =_OPEN as string;
    // 如果 _OPEN 是 ture 則手動抓路徑
  if (_OPEN === true) {
    const publicPath = (webpackDev.output?.publicPath || '/') as string;
    // 沒有子路徑，不做其他處理
    if (publicPath === '/') return baseURL;
    // 確保 publichPath 前後都有 /
    const formatPublicPath = `${publicPath}`.replace(
      /^(\/){0,}(.*[^/])?(\/){0,}$/,
      (_, $1 = '/', $2, $3 = '/') => !$2 ? $1 : `${$1}${$2}${$3}`,
    )
    return `${baseURL}${formatPublicPath}`
  }
  // 如果 _OPEN 是 string 則直接開啟
  return result;
}

async function start() {
  const PORT = await getPort(DEFAULT_HOST, DEFAULT_PORT);
  const ADDRESS = `http://${DEFAULT_HOST}:${PORT}`;
  const url = handleOpenUrl(ENABLE_OPEN)(ADDRESS)
  webpackDev.plugins?.push?.(new WebpackOpenBrowser({ url }));

  const devServer = express();
  // 加載 webpack 配置，獲取 compiler
  const compiler = webpack(webpackDev);
  setupMiddlewares(devServer, compiler);
  const httpServer = devServer.listen(PORT, DEFAULT_HOST, () => {
    console.log(
      `DevServer is running at ${chalk.magenta.underline(ADDRESS)} ${logSymbols.success}`,
    );
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      httpServer.close();
      console.log(
          chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`),
      );
      process.exit();
    });
  });
}

if (require.main === module) {
  // this module was run directly from the command line
  start();
}