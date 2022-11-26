module.exports = {
  env: {
    'node': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:sort/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'ignorePatterns': [ 'dist/**', 'migrations/**', 'seeders/*.js' ],
  overrides: [
    {
      'files': [ 'migrations/*.js','src/models/**', 'seeders/*.js' ],
      'rules': {
        'sort/object-properties': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'sort',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'array-bracket-spacing': [ 'error', 'always', {
      'arraysInArrays': false,
      'objectsInArrays': false,
      'singleValue': false,
    }],
    'arrow-parens': [ 'error', 'as-needed' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'eol-last': [ 'error', 'always' ],
    'eqeqeq': [ 'error', 'always' ],
    'indent': [ 'error', 2 ],
    'keyword-spacing': [ 'error', { 'after': true, 'before': true }],
    'max-len': [ 'error', {
      'code': 100,
      'ignoreComments': true,
      'ignoreRegExpLiterals': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreTrailingComments': true,
      'ignoreUrls': true,
      'tabWidth': 2,
    }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [ 'error', { 'max': 1 }],
    'no-prototype-builtins': 'off',
    'object-curly-spacing': [ 'error', 'always', {
      'arraysInObjects': false,
      'objectsInObjects': false,
    }],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'sort/type-properties': ['error'],
    'space-before-blocks': 'error',
  },
}
