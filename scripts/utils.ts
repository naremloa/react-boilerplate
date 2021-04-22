import _getPort from 'get-port';
import { argv } from 'yargs';
import _path from 'path'

async function getPort(host: string, port: number): Promise<number> {
  const result = await _getPort({ host, port });
  // 如果有端口佔用，則端口號 + 1
  if (result !== port) return getPort(host, port + 1);
  return result;
}

const __DEV__ = process.env.NODE_ENV !== 'production';
// 是否允許開啟 webpack-bundle-analyzer
const ENABLE_ANALYZE = !!argv.analyze;
// 是否允許開啟瀏覽器
const ENABLE_OPEN = argv.open as true | string;
const PROJECT_ROOT = _path.resolve(__dirname, '../');
const resolvePath = (...params: string[]) => _path.resolve(PROJECT_ROOT, ...params);
const PROJECT_NAME = require(resolvePath(PROJECT_ROOT, 'package.json'))?.name || '';
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 9527;

export {
  getPort,
  __DEV__,
  ENABLE_ANALYZE,
  ENABLE_OPEN,
  PROJECT_NAME,
  PROJECT_ROOT,
  DEFAULT_HOST,
  DEFAULT_PORT,
  resolvePath,
}
