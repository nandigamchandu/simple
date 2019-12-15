
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./devfractal-simple.cjs.production.min.js')
} else {
  module.exports = require('./devfractal-simple.cjs.development.js')
}
