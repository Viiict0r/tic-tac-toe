/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['dtos'])
const path = require('path')

module.exports = withTM({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  }
})
