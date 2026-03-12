module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: latest,
  },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
};
