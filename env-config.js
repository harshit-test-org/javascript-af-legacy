const prod = process.env.NODE_ENV === 'production'
const devVars = require('./.env.js')
const prodVars = require('./.env.prod.js')

module.exports = !prod ? devVars : prodVars
