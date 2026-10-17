// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import baseConfig from '@repo/eslint-config';


export default withNuxt(
  { ignores: ['app/types/sanity.ts'] },
  ...baseConfig,
  {
    rules: {
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
    },
  }
);
