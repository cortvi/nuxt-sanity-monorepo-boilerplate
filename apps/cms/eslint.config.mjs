// @ts-check
import studio from '@sanity/eslint-config-studio';
import baseConfig from '@repo/eslint-config';


export default [
  { ignores: ['dist', '.sanity'] },
  ...studio,
  ...baseConfig,
  {
    files: ['**/*.ts?(x)'],
    rules: {
      'typescript/no-explicit-any': ['warn'],
      'typescript/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
];
