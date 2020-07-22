/** @format */

const {
  chalk,
  execa,
  semver,

  clearConsole,

  hasYarn,
  hasPnpm3OrLater,

  warn
} = require("@fe6/cli-utils");
const boxen = require("boxen");
const getVersions = require("./get-versions");
let { name } = require("../../package.json");

async function getInstallationCommand() {
  if (hasYarn()) {
    const { stdout: yarnGlobalDir } = await execa("yarn", ["global", "dir"]);
    if (__dirname.includes(yarnGlobalDir)) {
      return "yarn global add";
    }
  }

  if (hasPnpm3OrLater()) {
    const { stdout: pnpmGlobalPrefix } = await execa("pnpm", [
      "config",
      "get",
      "prefix"
    ]);
    if (
      __dirname.includes(pnpmGlobalPrefix) &&
      __dirname.includes("pnpm-global")
    ) {
      return `pnpm i -g`;
    }
  }

  const { stdout: npmGlobalPrefix } = await execa("npm", [
    "config",
    "get",
    "prefix"
  ]);
  if (__dirname.includes(npmGlobalPrefix)) {
    return `npm i -g`;
  }

  return "";
}

exports.generateTitle = async checkUpdate => {
  const { current, latest, error } = await getVersions();
  let title = chalk.bold.blue(`FE6 CLI v${current}`);

  if (error) {
    title += `\n${chalk.red("Failed to check for updates")}`;
  }

  if (checkUpdate && !error && semver.gt(latest, current)) {
    let upgradeMessage = `New version available ${chalk.magenta(
      current
    )} → ${chalk.green(latest)}`;

    try {
      const command = await getInstallationCommand();
      if (semver.prerelease(latest)) {
        name += "@next";
      }

      if (command) {
        upgradeMessage += `\nRun ${chalk.yellow(
          `${command} ${name}`
        )} to update!`;
      }
    } catch (e) {
      warn(e);
    }

    const upgradeBox = boxen(upgradeMessage, {
      align: "center",
      borderColor: "green",
      dimBorder: true,
      padding: 1
    });

    title += `\n${upgradeBox}\n`;
  }

  return title;
};

exports.clearConsole = async function clearConsoleWithTitle(checkUpdate) {
  const title = await exports.generateTitle(checkUpdate);
  clearConsole(title);
};
