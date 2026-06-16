// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';


export default withNuxt(
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    jsx: false,
    quoteProps: 'as-needed',
  }),
  {
    // Your custom configs here
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

      'vue/no-v-html': ['off'],
      'vue/max-attributes-per-line': ['warn', {
        singleline: 4,
        multiline: 2,
      }],
      'vue/first-attribute-linebreak': ['off'],
      'vue/html-indent': ['warn', 2, {
        attribute: 1,
        baseIndent: 0,
        closeBracket: 0,
        alignAttributesVertically: false,
      }],
      'vue/html-closing-bracket-newline': ['warn', {
        singleline: 'never',
        multiline: 'always',
        selfClosingTag: {
          singleline: 'never',
          multiline: 'always',
        },
      }],
      'vue/html-quotes': ['error', 'double'],
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
      'vue/html-self-closing': ['off'],
      'vue/attributes-order': ['off'],
      'vue/multi-word-component-names': ['off'],

      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-unsafe-function-type': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-async-promise-executor': ['off'],
    },
  }
);
