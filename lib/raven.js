import Raven from 'raven-js'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { NODE_ENV, SENTRY_DSN_CLIENT }
} = getConfig()

if (NODE_ENV === 'production' && SENTRY_DSN_CLIENT) {
  Raven.config(SENTRY_DSN_CLIENT, {
    whitelistUrls: [/javascript\.af/, /www\.javascript\.af/, /beta\.javascript\.af/],
    environment: NODE_ENV
  }).install()
} else {
  console.info('Raven not enabled locally')
}
