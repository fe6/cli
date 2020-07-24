/** @format */

const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const validateProjectName = require("validate-npm-package-name");
const download = require("download-git-repo");
const dayjs = require("dayjs");
const {
  chalk,
  stopSpinner,
  logWithSpinner,
  error,
  log,
  done,
  exit
} = require("@fe6/cli-utils");
const { clearConsole } = require("./util/clearConsole");
const pkg = require("../package.json");

async function create(projectName, options) {
  const cwd = options.cwd || process.cwd();
  const inCurrent = projectName === ".";
  const name = inCurrent ? path.relative("../", cwd) : projectName;
  const targetDir = path.resolve(cwd, projectName || ".");

  const result = validateProjectName(name);

  if (!result.validForNewPackages) {
    error(chalk.red(`无效的项目名称: '${name}'`));
    if (result.errors) {
      result.errors.forEach(err => {
        error(chalk.red.dim(`Error: ${err}`));
      });
    }

    if (result.warnings) {
      result.warnings.forEach(warn => {
        error(chalk.red.dim(`Warning: ${warn}`));
      });
    }
    exit(1);
  }

  if (fs.existsSync(targetDir) && !options.merge) {
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      await clearConsole();
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: "ok",
            type: "confirm",
            message: `Generate project in current directory?`
          }
        ]);
        if (!ok) {
          return;
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: "action",
            type: "list",
            message: `Target directory ${chalk.cyan(
              targetDir
            )} already exists. Pick an action:`,
            choices: [
              { name: "Overwrite", value: "overwrite" },
              { name: "Merge", value: "merge" },
              { name: "Cancel", value: false }
            ]
          }
        ]);
        if (!action) {
          return;
        }
        if (action === "overwrite") {
          log(`\nRemoving ${chalk.cyan(targetDir)}...`);
          await fs.remove(targetDir);
        }
      }
    }
  }

  if (options.clone) {
    logWithSpinner("⚓", `下载中...`);
    download(`direct:${options.clone}`, targetDir, { clone: true }, err => {
      stopSpinner(false);
      if (err) {
        log();
        error(err);
        log();
      } else {
        log();
        done("下载成功");
        log();
      }
    });
  } else {
    const answer = await inquirer.prompt([
      {
        name: "template",
        type: "list",
        message: `Choose an initialization template`,
        choices: [
          {
            name: "tpl-vue2-js: js version project of vue2",
            value: "tpl-vue2-js"
          },
          {
            name: "tpl-vue2-ui-js: js component library of vue2",
            value: "tpl-vue2-ui-js"
          },
          { name: "tpl-flutter: flutter project", value: "tpl-flutter" },
          {
            name: "wechat-mini: weChat mini program",
            value: "tpl-wechat-mini"
          },
          { name: "ali-mini ali mini program", value: "tpl-ali-mini" }
        ]
      },
      {
        name: "version",
        type: "input",
        message: `app's version`,
        default: "0.0.0"
      },
      {
        name: "description",
        type: "input",
        message: `app's description`,
        default: "This is a new project"
      }
    ]);
    const { template } = answer;
    const tplName = `@fe6/${template}`;
    const hasTpl = Object.keys(pkg.dependencies).find(item => item === tplName);

    if (hasTpl) {
      logWithSpinner("⚓", `获取模板中...`);
      /* eslint-disable global-require */
      /* eslint-disable import/no-dynamic-require */
      const tplModule = await require(tplName);
      stopSpinner(false);
      const err = await tplModule({
        data: {
          ...answer,
          name,
          cwd: targetDir,
          date: dayjs().format("YYYY-MM-DD HH:mm:ss")
        },
        beforeInit: () => logWithSpinner("⚓", `创建中...`)
      });
      stopSpinner(false);
      log();
      if (err) {
        error(`${template} 创建异常： ${err.code}-${err.message}\n`);
      } else {
        done(`成功创建项目 ${chalk.cyan(name)}.`);
      }
      log();
    } else {
      log();
      error(`${template} '暂不支持，建设中...\n`);
      log();
    }
  }
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    stopSpinner(false);
    error(err);
    process.exit(1);
  });
};
