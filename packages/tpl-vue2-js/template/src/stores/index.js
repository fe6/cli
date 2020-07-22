/** @format */

// Vuex 官方文档 https://vuex.vuejs.org/zh-cn/
// 我们组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';
import state from '@/stores/states';
import actions from '@/stores/actions';
import getters from '@/stores/getters';
import mutations from '@/stores/mutations';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
});
