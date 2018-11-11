'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://172.247.253.209:9988"'
  // BASE_API: '"http://172.16.28.54:9988"'
  BASE_API: '"http://610333.com"'

})
