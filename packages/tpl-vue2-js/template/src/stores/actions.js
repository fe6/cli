/** @format */

// 根级别的 action
import types from '@/stores/mutation-types';

export default {
  setTitle({ commit }, title) {
    commit(types.SET_TITLE, title);
  },
};
