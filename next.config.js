const withSourceMaps = require('@zeit/next-source-maps')
const composePlugins = require('next-compose-plugins')
const offline = require('next-offline')
const progess = require('next-progressbar')
const prod = process.env.NODE_ENV === 'production'
const devVars = require('./.env.js')
const prodVars = require('./.env.prod.js')

const nextConfig = {
  publicRuntimeConfig: !prod ? devVars : prodVars,
  webpack: function(cfg) {
    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js']) {
        entries['main.js'].unshift('./client/polyfills.js')
      }

      return entries
    }

    return cfg
  }
}

module.exports = composePlugins([withSourceMaps, offline, progess], nextConfig)
