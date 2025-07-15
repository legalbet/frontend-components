import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules', 'build', 'dist'],
  },

  {
    files: ['**/*.{js,ts,vue,mjs}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...vuePlugin.configs.base.rules,
      // ...vuePlugin.configs['vue3-essential'].rules,
      'vue/comment-directive': 'off',

      '@typescript-eslint/no-dynamic-delete': 'off',

      'prettier/prettier': [
        'error',
        {
          printWidth: 120,
          useTabs: false,
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          quoteProps: 'as-needed',
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],
    },
  },
];
