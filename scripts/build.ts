import webpack from 'webpack';
import webpackProd from './config/webpack.prod';

const compiler = webpack(webpackProd);

compiler.run((error, stats) => {
  if (error) {
      console.error(error);
      return;
  }

  const options = {
    preset: 'normal',
    colors: true,
  };

  console.log((stats || '').toString(options));
});