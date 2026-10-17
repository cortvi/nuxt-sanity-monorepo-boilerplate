// @ts-check
import stylistic from '@stylistic/eslint-plugin';


export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    jsx: false,
    quoteProps: 'as-needed',
  }),
  {
    rules: {
      '@stylistic/indent': ['warn', 2, {
        flatTernaryExpressions: true,
        SwitchCase: 1,
      }],
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 2,
        maxBOF: 1,
        maxEOF: 1,
      }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      }],
      '@stylistic/max-len': ['warn', {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
      }],
      '@stylistic/semi': ['error', 'always', {
        omitLastInOneLineBlock: true,
        omitLastInOneLineClassBody: true,
      }],
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
        importAttributes: 'never',
        dynamicImports: 'never',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      }],
      '@stylistic/brace-style': ['off'],
      '@stylistic/max-statements-per-line': ['off'],
      '@stylistic/operator-linebreak': ['error', 'after'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/no-floating-decimal': ['off'],

      'no-async-promise-executor': ['off'],
    },
  },
];
