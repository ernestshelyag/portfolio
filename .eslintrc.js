module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // custom
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'no-console': ['warn', { 'allow': ['info', 'warn', 'error'] }],
    'no-param-reassign': ['error', {'props': false }],
    'no-use-before-define': ['error', { 'functions': false }],
    'arrow-body-style': ['error', 'as-needed'],
    'max-len': ['error', 130],
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'object-curly-spacing': 0,
    'object-curly-newline': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'no-throw-literal': 0
  },
};
