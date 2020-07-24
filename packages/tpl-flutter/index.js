const path = require("path");
const { tpl } = require("@fe6/cli-utils");
const tplPrompt = require("./prompt.js");

module.exports = async arg => {
  await tpl({
    ...arg,
    prompt: tplPrompt,
    source: path.resolve(__dirname, "./template/")
  });
};
