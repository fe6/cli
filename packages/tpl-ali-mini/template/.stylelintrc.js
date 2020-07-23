/** @format */

module.exports = {
  extends: [require.resolve('@fe6/norm/src/stylelint-only')],
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
  },
};
