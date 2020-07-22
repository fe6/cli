/** @format */

// Command对象本身作为选项传递，
// 返回新对象

const { camelize } = require("@fe6/cli-utils");

module.exports = cmd => {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ""));
    // 如果不存在选项，并且Command具有相同名称的方法
    // 不应复制
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
};
