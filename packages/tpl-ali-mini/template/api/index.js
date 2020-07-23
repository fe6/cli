/**
 * 支付宝小程序 API 封装
 *
 * @format
 */
class Api {
  static getAuthCode({ scopeCode, before } = { scopeCode: 'auth_user' }) {
    return new Promise((resolve, reject) => {
      // https://opendocs.alipay.com/mini/api/openapi-authorize
      my.getAuthCode({
        before,
        scopes: scopeCode,
        success: resolve,
        fail: (err) => reject(err),
      });
    });
  }

  /**
   *  参考链接 https://www.npmjs.com/package/@ubr/navigate2
   * @param {params.success} function 跳转成功提示
   * @param {params.fail} function 跳转失败提示
   * @param {params.complete} function 跳转结果提示
   * @param {params.url} string 跳转地址
   */
  static navigateTo(params) {
    my.navigateTo(params);
  }

  static setStorageSync(params) {
    my.setStorageSync(params);
  }

  static getStorageSync(params) {
    return my.getStorageSync(params);
  }

  static request(params) {
    my.request(params);
  }

  static alert(params) {
    my.alert(params);
  }

  static showLoading(params) {
    my.showLoading(params);
  }

  static hideLoading(params) {
    my.hideLoading(params);
  }

  static openLocation(params) {
    my.openLocation(params);
  }

  /**
   * 获取地理位置
   * @param {type} Number 获取经纬度数据的类型
   */
  static getLocation(type = 0) {
    return new Promise((resolve, reject) => {
      if (my.getLocation) {
        Api.showLoading();
        my.getLocation({
          type,
          success: resolve,
          fail() {
            reject();
            Api.alert({ title: '定位失败' });
          },
          complete() {
            Api.hideLoading();
          },
        });
      } else {
        reject();
        Api.alert({
          title: '提示',
          content: '当前支付宝版本过低，无法使用此功能，请升级最新版本支付宝',
        });
      }
    });
  }

  static navigateToAlipayPage({ appCode, success, fail }) {
    my.ap.navigateToAlipayPage({
      appCode,
      appParams: {},
      success: (res) => {
        if (success) {
          success(res);
        }
      },
      fail: (res) => {
        if (fail) {
          fail(res);
        }
      },
    });
  }

  static hideKeyboard() {
    my.hideKeyboard();
  }
}

export default Api;
