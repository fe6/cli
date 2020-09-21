/** @format */

// 全局注册组件
import Vue from 'vue';

// 首字母大写转换
function changeStr(str) {
  // 去字符的第一个字节转大写
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// importComponents('./components');
// 全局注册组件
export const importComponents = () => {
  // . 当前目录
  // false 是否使用子目录
  const requireComponent = require.context('@/components', true, /\.vue$/);

  requireComponent.keys().forEach((fileName) => {
    // 第 i 个
    const config = requireComponent(fileName);
    const componentName = changeStr(
      fileName.replace(/^\.\//g, '').replace(/.vue/g, ''),
    );

    Vue.component(componentName, config.default || config);
  });
};

// 动态路由管理
export const importRouters = () => {
  const rq = require.context('@/routers', true, /\.routers\.js$/);
  return rq.keys().map((key) => rq(key).default);
};

// 动态接口路由管理，名字不能重复
export const importApisRouters = () => {
  const rq = require.context('@/apis', true, /\.apis\.js$/);
  const rgKey = /\.apis\.js$|^\.\//g;
  const newApis = {};
  rq.keys().forEach((key) => {
    newApis[key.replace(rgKey, '')] = rq(key).default;
  });
  return newApis;
};
