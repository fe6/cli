/** @format */

const program = require("commander");
const minimist = require("minimist");
const { chalk, warn } = require("@fe6/cli-utils");
const cleanArgs = require("../../lib/util/clean-args");
const init = require("../../lib/init");

module.exports = () => {
  program
    .command("init <app-name>")
    .description("initialize the project")
    .option("-c, --clone <url>", "Use git clone when fetching remote preset")
    .option("-d, --default", "Skip prompts and use default preset")
    .option("-f, --force", "Overwrite target directory if it exists")
    .option(
      "-g, --git [message]",
      "Force git initialization with initial commit message"
    )
    .option("-n, --no-git", "Skip git initialization")
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
      // --git makes commander to default git to true
      if (process.argv.includes("-g") || process.argv.includes("--git")) {
        options.forceGit = true;
      }

      init(name, options);
    });
};
