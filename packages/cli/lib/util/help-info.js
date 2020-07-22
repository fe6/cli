/** @format */

const program = require("commander");
const { chalk, log } = require("@fe6/cli-utils");

module.exports = () => {
  program.on("--help", () => {
    log();
    log(
      `  Run ${chalk.cyan(
        `fe6 [command] --help`
      )} for detailed usage of given command.`
    );
    log();
  });
};
