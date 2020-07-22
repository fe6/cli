/** @format */

import Vue from 'vue';
import ElementUI from 'element-ui';

import App from '@/App';
import router from '@/routers';
import store from '@/stores';

import 'em-normalize/dist/em-normalize.scss';
import './assets/styles/element-variables.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
