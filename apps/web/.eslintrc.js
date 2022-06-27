module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'custom',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    camelcase: 'off',
    'multiline-ternary': 'off',
    'prettier/prettier': 'error',
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
