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

let ga

if (typeof window !== 'undefined') {
  ga = window.ga
} else {
  ga = () => {}
}

export const track = (category, action, label) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('tracking: ', category, action, label)
  } else {
    if (!ga) return
    // only send events from production
    try {
      ga('send', 'event', category, action, label)
    } catch (err) {
      console.error('error logging event', err)
    }
  }
}

export const pageView = url => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('pageview: ', url)
  } else {
    if (!ga) return
    // only send events from production
    try {
      ga('send', 'pageview', url)
    } catch (err) {
      console.error('error logging event', err)
    }
  }
}
