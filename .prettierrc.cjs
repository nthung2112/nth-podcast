/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
};
