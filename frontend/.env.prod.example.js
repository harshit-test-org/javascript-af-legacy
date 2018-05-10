// While this file needs to exist, it is only used while deploying to production

module.exports = {
    "BACKEND": "http://localhost:8080/api",
    "WEBSOCKET": "ws://localhost:8080/api",
    "ALGOLIA_APP_ID": "SEARCH_WILL_NOT_WORK_WITHOUT_IT",
    "ALGOLIA_API_KEY": 'SEARCH_WILL_NOT_WORK_WITHOUT_IT',
    "ALGOLIA_INDEX_NAME": "users",
    "NODE_ENV": "development",
    "SENTRY_DSN_CLIENT": "NO_NEED_TO_ADD_IN_DEV"
  }
