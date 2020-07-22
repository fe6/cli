/** @format */

const program = require("commander");
const { chalk, log } = require("@fe6/cli-utils");

const enhanceErrorMessages = (methodName, logs) => {
  program.Command.prototype[methodName] = (...args) => {
    /* eslint-disable no-underscore-dangle */
    if (methodName === "unknownOption" && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    log(`  ${chalk.red(logs(...args))}`);
    log();
    process.exit(1);
  };
};

module.exports = () => {
  enhanceErrorMessages("missingArgument", argName => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
  });

  enhanceErrorMessages("unknownOption", optionName => {
    return `Unknown option ${chalk.yellow(optionName)}.`;
  });

  enhanceErrorMessages("optionMissingArgument", (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}${
      flag ? `, got ${chalk.yellow(flag)}` : ``
    }`;
  });
};
