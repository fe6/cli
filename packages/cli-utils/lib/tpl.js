/** @format */

const inquirer = require("inquirer");
const async = require("async");
const mlsm = require("metalsmith");
const { compile } = require("handlebars");

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
      .source(data.source)
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

exports.tpl = async (
  options = { data: {}, beforeInit: () => {}, prompt: [], source: "" }
) => {
  const { data, beforeInit, prompt, source } = options;
  let promptResult = {};

  if (prompt.length > 0) {
    promptResult = await inquirer.prompt(prompt);
  }

  beforeInit();
  await processTpls({
    ...promptResult,
    ...data,
    ...options,
    source
  });
};
