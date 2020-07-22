/** @format */

import nProgress from 'nprogress';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
  ],
});

// 路由开始之前的全局函数
router.beforeEach((to, from, next) => {
  // 进入条开始检测
  nProgress.start();
  next();
});

// 路由结束之后的全局函数
router.afterEach(() => {
  // 进度条完成
  nProgress.done();
});

export default router;
