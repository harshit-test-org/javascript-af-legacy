let Raven
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN_SERVER) {
  Raven = require('raven')
  Raven.config(process.env.SENTRY_DSN_SERVER, {
    environment: process.env.NODE_ENV
  }).install()
} else {
  console.log('Mocking raven in dev')
  const noop = () => {}
  // Mock the Raven API in development
  Raven = {
    captureException: noop,
    setUserContext: noop,
    config: () => ({ install: noop }),
    requestHandler: () => (req, res, next) => next(),
    errorHandler: () => (req, res, next) => next(),
    parsers: {
      parseRequest: noop
    }
  }
}

export default Raven
