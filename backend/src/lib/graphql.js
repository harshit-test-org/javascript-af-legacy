import axios from 'axios'

const DEFAULT_URI = 'https://api.github.com/graphql'

export default ({ query, url = DEFAULT_URI, headers = {} }) => axios.post(url, { query }, { headers })
