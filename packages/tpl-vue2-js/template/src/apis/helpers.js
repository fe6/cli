/** @format */

// ajax 相关方法的集合

import axios from 'axios';
import guid from 'em-underline/guid';
import ElementUI from 'element-ui';
import CONSTANT, { TOKEN_PREFIX, DATA_PREFIX } from '@/constant';

const { CancelToken } = axios;

const getGuid = localStorage[`${DATA_PREFIX}_X_Session_Id`] || guid();
localStorage[`${DATA_PREFIX}_Session_Id`] = getGuid;

export const headersCommon = {
  'X-Session-Id': getGuid,
  [CONSTANT.EVENT_TOKE_VALUE]: `Bearer ${localStorage[CONSTANT.EVENT_TOKE]}`,
};

const ajaxList = [];
const removePending = (ever) => {
  ajaxList.forEach((ajaxItem, ajaxIndex) => {
    if (!ever || ajaxItem.u === `${ever.url}&${ever.method}`) {
      // 当当前请求在数组中存在时执行函数体
      ajaxItem.f(); // 执行取消操作
      ajaxList.splice(ajaxIndex, 1); // 把这条记录从数组中移除
    }
  });
};

export const filterData = (result) => {
  // 是否有返回值，并且检查状态码是否是成功
  const { code, data, message } = result.data;
  // CONSTANT.AJAX_SUCCESS 以常量形式存储
  if (result && code === CONSTANT.AJAX_SUCCESS) {
    return data;
  }

  ElementUI.Message({
    showClose: true,
    message: message || '网络错误',
    type: 'error',
  });
  return '';
};

/**
 * Create Axios
 */
export const http = axios.create({
  timeout: 60000,
});

/**
 * Headers Config
 */
http.defaults.headers.common = {
  'X-Session-Id': getGuid,
};

/**
 * 处理请求时的姿势
 */
http.interceptors.request.use(
  (config) => {
    config.headers.common[CONSTANT.EVENT_TOKE_VALUE] = `Bearer ${
      localStorage[CONSTANT.EVENT_TOKE]
    }`;
    removePending(config); // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new CancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      ajaxList.push({ u: `${config.url}&${config.method}`, f: c });
    });
    return config;
  },
  (error) => {
    ElementUI.Message({
      showClose: true,
      message: error || '网络错误',
      type: 'error',
    });
  },
);

function refreshToken(response) {
  // instance是当前request.js中已创建的axios实例
  return new Promise((resolve) => {
    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
    resolve(response.headers[CONSTANT.EVENT_TOKE_VALUE.toLocaleLowerCase()]);
  });
}

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = []; // 401 之后重新获取
http.interceptors.response.use(
  (response) => {
    const { refresh } = response.data;
    // 当 19999 的时候需要刷新 token ，无感知刷新 token
    if (refresh && refresh === 19999) {
      const { config } = response;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken(response).then((token) => {
          localStorage.setItem([CONSTANT.EVENT_TOKE], token);
          config.headers[CONSTANT.EVENT_TOKE_VALUE] = `${TOKEN_PREFIX}${token}`;
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach((cb) => cb(token));
          isRefreshing = false;
          requests = [];
          return http(config);
        });
      }
      // 正在刷新token，将返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((token) => {
          config.headers[CONSTANT.EVENT_TOKE_VALUE] = token;
          resolve(http(config));
        });
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const catchErrorFn = (res) => {
  removePending();
  if (res) {
    if (res.status === 401) {
      ElementUI.Message({
        showClose: true,
        message: 'Token 过期',
        type: 'error',
      });
    } else {
      ElementUI.Message({
        showClose: true,
        message: res.statusText,
        type: 'error',
      });
    }
  }
};
