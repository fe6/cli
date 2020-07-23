/** @format */

import ajax from '../utils/request';

const app = getApp();

/**
 * 接口请求封装
 */
class Ajax {
  /**
   * 授权
   * @param {*} userCode
   */
  static userAuth(userCode) {
    return ajax({
      url: `${app.data.HOST_TEST}login`,
      method: 'POST',
      data: JSON.stringify({
        userCode,
      }),
    });
  }
}

export default Ajax;
