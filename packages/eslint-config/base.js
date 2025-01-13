/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'turbo',
  ],
  plugins: ['@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '.*.js',
    '*.setup.js',
    '*.config.js',
    '.turbo/',
    'dist/',
    'coverage/',
    'node_modules/',
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'named': 'never',
      'anonymous': 'always',
      'asyncArrow': 'always'
    }],
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreMemberSort': false,
      'allowSeparatedGroups': true,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      'ignoreDeclarationSort': false,
    }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    '@typescript-eslint/no-explicit-any': 'off',
  }
};
