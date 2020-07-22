/** @format */

exports.chalk = require("chalk");
exports.execa = require("execa");
exports.semver = require("semver");
exports.camelize = require("./camelize");

const list = ["camelize", "exit", "logger", "spinner", "pkg", "validate"];

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
list.forEach(m => {
  Object.assign(exports, require(`./${m}`));
});
