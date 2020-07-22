/** @format */

const leven = require("leven");
const program = require("commander");
const { chalk, log } = require("@fe6/cli-utils");

const suggestCommands = unknownCommand => {
  if (unknownCommand) {
    program.outputHelp();

    log(`  ${chalk.red(`Unknown command ${chalk.yellow(unknownCommand)}.`)}`);

    /* eslint-disable no-underscore-dangle */
    const availableCommands = program.commands.map(cmd => cmd._name);

    let suggestion;

    availableCommands.forEach(cmd => {
      const isBestMatch =
        leven(cmd, unknownCommand) < leven(suggestion || "", unknownCommand);
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd;
      }
    });

    if (suggestion) {
      log(`  ${chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`)}`);
    }
  }
};

module.exports = () => {
  program.arguments("[command]").action(suggestCommands);
};
