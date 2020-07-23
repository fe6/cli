/** @format */

import Ajax from '../ajax';
import Api from '../api';
import { TOKEN_NAME } from '../constant';

class Auth {
  static async goAuth() {
    const { authCode } = await Api.getAuthCode({
      scopeCode: ['auth_base'],
    });

    if (authCode) {
      const result = await Ajax.userAuth(authCode);
      return result;
    }

    return {};
  }

  static setToekn(result) {
    Api.setStorageSync({
      key: TOKEN_NAME,
      data: result.token,
    });
  }

  static getToekn() {
    return Api.getStorageSync({
      key: TOKEN_NAME,
    }).data;
  }
}

export default Auth;
