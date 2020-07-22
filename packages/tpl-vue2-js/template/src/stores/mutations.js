/** @format */

// 根级别的 mutation
import types from '@/stores/mutation-types';

export default {
  [types.SET_TITLE](state, title) {
    state.title = title;
  },
};
