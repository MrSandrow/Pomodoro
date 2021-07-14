module.exports = {
  env: { browser: true, es2021: true },
  extends: ['airbnb-base'],
  parserOptions: { ecmaVersion: 12, sourceType: 'module' },
  globals: {
    test: 'readonly',
    expect: 'readonly',
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
