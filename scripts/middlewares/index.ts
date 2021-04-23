import { Compiler } from 'webpack';
import { Express } from 'express';
import webpackMiddleware from './webpackMiddleware';

export default function setupMiddlewares(server: Express, compiler: Compiler): void {
  server.use(webpackMiddleware(compiler));
}