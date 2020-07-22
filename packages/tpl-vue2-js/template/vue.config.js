/** @format */

const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.VUE_APP_CDN,
  productionSourceMap: false,
  configureWebpack: (config) => {
    // 自动修复语法错误
    Object.assign(
      config.module.rules[config.module.rules.length - 1].use[0].options,
      {
        fix: true,
      },
    );

    if (process.env.NODE_ENV === 'production') {
      const comp = new CompressionPlugin({
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      });
      config.plugins.push(comp);
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'));

    config.plugin('StyleLintPlugin').use(StyleLintPlugin, [
      {
        fix: true,
      },
    ]);

    return config;
  },
};
