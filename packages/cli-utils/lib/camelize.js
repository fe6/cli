/** @format */

module.exports = str =>
  str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
