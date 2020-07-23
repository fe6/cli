/** @format */
import { HOST_TEST } from './env/dev';
// import { HOST_TEST } from '../env/test';
// import { HOST_TEST } from '../env/pro';

App({
  data: {
    HOST_TEST,
  },
  onLaunch() {
    // options
    // 第一次打开
    // options.query == {number:1}
    // console.info(`App onLaunch with options: ${JSON.stringify(options)}`);
  },
  onShow() {
    // options
    // 从后台被 scheme 重新打开
    // console.info(`App onShow with options: ${JSON.stringify(options)}`);
  },
});
