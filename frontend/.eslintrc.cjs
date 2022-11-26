/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:sort/recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'sort',
    'unused-imports',
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/no-multiple-template-root': 'off', // as this is supported in Vue 3
    'array-bracket-spacing': [ 'error', 'always', {
      'arraysInArrays': false,
      'objectsInArrays': false,
      'singleValue': false,
    }],
    'arrow-parens': [ 'error', 'as-needed' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'eqeqeq': [ 'error', 'always' ],
    'eol-last': [ 'error', 'always' ],
    'indent': [ 'error', 2 ],
    'keyword-spacing': [ 'error', { 'after': true, 'before': true }],
    'max-len': [ 'error', {
      'code': 100,
      'ignoreComments': true,
      'ignorePattern': 'd="([\\s\\S]*?)"', // svg path property
      'ignoreRegExpLiterals': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreTrailingComments': true,
      'ignoreUrls': true,
      'tabWidth': 2,
    }],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [ 'error', { 'max': 1 }],
    'object-curly-spacing': [ 'error', 'always', {
      'arraysInObjects': false,
      'objectsInObjects': false,
    }],
    'prefer-const': 'off',
    'quotes': [ 'error', 'single' ],
    'sort/type-properties': ['error'],
    'semi': [ 'error', 'never' ],
    'space-before-blocks': 'error',
    'space-in-parens': [ 'error', 'never' ],
    'unused-imports/no-unused-imports': 'warn',
    'sort/object-properties': 'off',
    'vue/no-mutating-props': 'error',
    'vue/no-setup-props-destructure': 'error',
    'vue/valid-next-tick': 'warn',
  },
}
