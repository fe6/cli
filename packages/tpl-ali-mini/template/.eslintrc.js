/** @format */

module.exports = {
  extends: [require.resolve('@fe6/norm/src/eslint/js')],
  globals: {
    Page: true,
    my: true,
    App: true,
    Component: true,
    getApp: true,
  },
};
