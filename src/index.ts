import testA from './test';
import testB from './testB';

if(module.hot){
  // accept itself
  module.hot.accept()
}

console.log('hhccc', testA, testB);