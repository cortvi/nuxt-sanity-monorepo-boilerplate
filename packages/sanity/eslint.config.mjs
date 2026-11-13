// @ts-check
import tseslint from 'typescript-eslint';
import baseConfig from '@repo/eslint-config';


export default [
  ...tseslint.configs.recommended,
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-unsafe-function-type': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
];
