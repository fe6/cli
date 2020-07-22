/** @format */

export const DATA_PREFIX = '{{appId}}_';
export const TOKEN_NAME = `${DATA_PREFIX}AUTH`;
export const TOKEN_PREFIX = 'Bearer ';

export default {
  IS_DEV: process.env.NODE_ENV === 'development',
  // cookie 1 天过期
  EVENT_TOKE_VALUE: 'Authorization',
  EVENT_TOKE: TOKEN_NAME,
  AJAX_SUCCESS: 10000,
};
