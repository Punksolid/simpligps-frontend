'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://54.202.120.83/api/"',
     BASE_API: '"https://api-testing.dogoit.com/api/"'
})
