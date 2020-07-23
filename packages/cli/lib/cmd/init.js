/** @format */

const program = require("commander");
const minimist = require("minimist");
const { chalk, warn } = require("@fe6/cli-utils");
const cleanArgs = require("../util/clean-args");
const init = require("../init");

module.exports = () => {
  program
    .command("init <app-name>")
    .description("initialize the project")
    .option("-c, --clone <url>", "Use git clone when fetching remote preset")
    .option("-f, --force", "Overwrite target directory if it exists")
    .option("-m, --merge", "Merge target directory if it exists")
    .action((name, cmd) => {
      const options = cleanArgs(cmd);

      if (minimist(process.argv.slice(3))._.length > 1) {
        warn(
          chalk.yellow(
            "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored."
          )
        );
      }

      init(name, options);
    });
};
