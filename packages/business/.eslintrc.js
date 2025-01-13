/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/nest.js'],
  parserOptions: {
    project: 'tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
};
