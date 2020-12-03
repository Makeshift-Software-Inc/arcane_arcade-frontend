module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-console': 0,
    camelcase: 0,
    'react/prop-types': 0,
    'react/jsx-fragments': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-underscore-dangle': 0,
  },
};
