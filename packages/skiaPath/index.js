'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/skia-path2d.cjs.js')
} else {
  module.exports = require('./dist/skia-path2d.cjs.js')
}