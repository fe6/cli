# cli

快速为模块和应用程序创建一个开发环境

## 准备

- [NodeJs 8.9+](https://nodejs.org/)
- [nvm](https://github.com/nvm-sh/nvm): 推荐 NodeJs 版本管理 
- [yarn](https://yarnpkg.com)： 比 NodeJs 内置的 npm 安装的快

## 起步

安装：

```bash
npm install -g @fe6/cli
# OR
yarn global add @fe6/cli
```

创建一个项目：

```bash
fe6 init my-project
# OR
fe6 init my-project -c https://github.com/iq9891/ieditor.git
```

## 命令

- 创建项目 **my-project**

```bash
fe6 init my-project
```

- 创建项目 **my-project** , 覆盖目标目录（如果存在）

```bash
fe6 init my-project -f
# OR
fe6 init my-project --force
```

- 创建项目 **my-project** , 合并目标目录（如果存在）

```bash
fe6 init my-project -m
# OR
fe6 init my-project --merge
```

- 从 github 模板仓库 ieditor 创建项目 **my-project**

```bash
fe6 init my-project -c https://github.com/iq9891/ieditor.git
# OR
fe6 init my-project --clone https://github.com/iq9891/ieditor.git
```

## 示例

![示例](./public/demo.gif)

## cli 周边

| 项目 | 状态 | 描述 |
|---------|--------|-------------|
| [@fe6/cli] | [![@fe6/cli-status]][@fe6/cli-package] | 创建应用工具 |
| [@fe6/cli-utils] | [![@fe6/cli-utils-status]][@fe6/cli-utils-package] | cli 公共方法 |
| [@fe6/tpl-vue2-js] | [![@fe6/tpl-vue2-js-status]][@fe6/tpl-vue2-js-package] | cli 内置 **Vue 2.x** 的 **JavaScript** 项目模板 |
| [@fe6/tpl-ali-mini] | [![@fe6/tpl-ali-mini-status]][@fe6/tpl-ali-mini-package] | cli 内置 **支付宝小程序** 项目模板 |
| [@fe6/tpl-flutter] | [![@fe6/tpl-flutter-status]][@fe6/tpl-flutter-package] | cli 内置 **flutter** 项目模板 |

[@fe6/cli]: https://github.com/fe6/cli/tree/master/packages/cli
[@fe6/cli-utils]: https://github.com/fe6/cli/tree/master/packages/cli-utils
[@fe6/tpl-vue2-js]: https://github.com/fe6/cli/tree/master/packages/tpl-vue2-js
[@fe6/tpl-ali-mini]: https://github.com/fe6/cli/tree/master/packages/tpl-ali-mini
[@fe6/tpl-flutter]: https://github.com/fe6/cli/tree/master/packages/tpl-flutter

[@fe6/cli-status]: https://img.shields.io/npm/v/@fe6/cli.svg
[@fe6/cli-utils-status]: https://img.shields.io/npm/v/@fe6/cli-utils.svg
[@fe6/tpl-vue2-js-status]: https://img.shields.io/npm/v/@fe6/tpl-vue2-js.svg
[@fe6/tpl-ali-mini-status]: https://img.shields.io/npm/v/@fe6/tpl-ali-mini.svg
[@fe6/tpl-flutter-status]: https://img.shields.io/npm/v/@fe6/tpl-flutter.svg

[@fe6/cli-package]: https://www.npmjs.com/package/@fe6/cli
[@fe6/cli-utils-package]: https://www.npmjs.com/package/@fe6/cli-utils
[@fe6/tpl-vue2-js-package]: https://www.npmjs.com/package/@fe6/tpl-vue2-js
[@fe6/tpl-ali-mini-package]: https://www.npmjs.com/package/@fe6/tpl-ali-mini
[@fe6/tpl-flutter-package]: https://www.npmjs.com/package/@fe6/tpl-flutter

## 提问

若遇到问题，请移步 -> [issues](https://github.com/fe6/cli/issues)
