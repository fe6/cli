/** @format */

import Api from '../api';
import { TOKEN_NAME } from '../constant';
// import Auth from './auth';

const errorFn = (content) => {
  Api.alert({ content: content || '请求失败，请检查网络' });
};

/**
 * request 小程序方法的封装
 * arg 说明
 * @param url String 目标服务器 URL
 * @param requiredLogin boolean 是否需要登录
 * @param method String 方法
 * @param dataType String 期望返回的数据格式，默认 JSON
 * @param filter boolean 过滤一层
 * @returns void
 */
const ajax = (arg) => {
  const requiredLogin = arg.requiredLogin || false;
  const token = Api.getStorageSync({ key: TOKEN_NAME }).data;

  // 如果需要 token 没有登录
  if (requiredLogin && !token) {
    Api.hideLoading();
    Api.alert({ content: '需要登录' });
    return;
  }

  const headers = {
    'content-type': 'application/json',
  };

  // 如果需要登录，解码 TOKEN_NAME
  if (requiredLogin) {
    headers.Authorization = decodeURIComponent(token);
  }

  const myHttp = new Promise((resolve) => {
    const {
      url,
      method = 'GET',
      data,
      filter, // 过滤一层
      fail,
    } = arg;

    const successHandle = (sucRes) => {
      const sucData = sucRes.data;
      resolve(filter ? sucData.data : sucData);
    };

    const failHandle = (failRes) => {
      // 真机 status 是 0 ，预览是 401 ， 后端返回是 401
      if (failRes.status === 0 || failRes.status === 401) {
        Api.alert({ content: '登录过期' });
        return;
      }

      if (typeof fail === 'function') {
        fail();
      } else {
        errorFn();
      }
    };

    Api.showLoading({
      content: '加载中...',
    });

    Api.request({
      url,
      method,
      data,
      headers,
      dataType: arg.dataType || 'json',
      success: successHandle,
      fail: failHandle,
      complete: () => {
        Api.hideLoading();
      },
    });
  });

  /* eslint-disable consistent-return */
  return myHttp;
};

export default ajax;
