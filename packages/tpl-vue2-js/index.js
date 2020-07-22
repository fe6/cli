/** @format */

const path = require("path");
const inquirer = require("inquirer");
const async = require("async");
const mlsm = require("metalsmith");
const { compile } = require("handlebars");
const tplPrompt = require("./prompt.js");

function renderTpls(files, metalsmith, done) {
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();

  async.each(
    keys,
    (filename, next) => {
      const str = files[filename].contents.toString();

      // 订正
      if (/^_[^_]+/i.test(filename)) {
        const fName = filename.replace(/^_/i, ".");
        files[fName] = files[filename];
        delete files[filename];
        return next();
      }

      if (!/[^$]{{([^{}]+)}}/g.test(str)) {
        return next();
      }

      const render = compile(str, metadata);
      const result = render(metadata);
      files[filename].contents = Buffer.from(result);
      return next();
    },
    done
  );
}

function processTpls(data) {
  return new Promise((resolve, reject) => {
    mlsm(process.cwd())
      .metadata(data)
      .clean(false)
      .source(path.resolve(__dirname, "./template/"))
      .destination(data.cwd)
      .use(renderTpls)
      .build(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

async function tplModule(options = { data: {}, beforeInit: () => {} }) {
  const { data, beforeInit } = options;
  const promptResult = await inquirer.prompt(tplPrompt);
  beforeInit();
  await processTpls({
    ...promptResult,
    ...data,
    ...options
  });
}

module.exports = tplModule;
