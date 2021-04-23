module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
      }]
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      // 處理動態 import
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      development: {
        presets: [
          // 處理 React 解析，和自動引入 React
          ['@babel/preset-react', { development: true, runtime: 'automatic' }]
        ],
      },
      production: {
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
        ]
      },
    },
  };
};