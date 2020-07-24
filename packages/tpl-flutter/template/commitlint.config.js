/**
 * commit message的格式，可以安装 commitizen
 * Header(是必须的)，注意 :与subject之间的空格必须有；scope主要用于说明 commit 影响的范围，比如MVC，视项目情况自主分层
 *  - <type>([scope]): <subject>
 * 空一行
 * Body
 * 空一行
 * Footer
 *
 * type：
 *  - feat: 新功能，A new feature
 *  - fix: bug fix
 *  - docs: 文档更新
 *  - style: 格式（不影响代码运行的变动）
 *  - refactor: 重构（不是新增功能、bugfix的代码变动）
 *  - perf: 性能优化
 *  - test: 测试相关
 *  - chore: 其他改动
 *
 * @format
 */

module.exports = {
  extends: ["@commitlint/config-conventional"]
};
