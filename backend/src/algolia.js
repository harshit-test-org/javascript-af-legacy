import algoliasearch from 'algoliasearch'

const ALGOLIA_ID = process.env.ALGOLIA_ID
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY
// const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY

export default algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)
