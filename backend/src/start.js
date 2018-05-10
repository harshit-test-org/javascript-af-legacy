// eslint-disable-next-line no-unused-vars
import _ from './config'
// Include models here (for mongoose singleton to work)
import mongoose from 'mongoose'
import './models/Users'
import './models/Repos'
import { ApolloEngine } from 'apollo-engine'
import app from './app'

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo :)')
})

mongoose.connection.on('error', e => {
  console.log(`Mongo error -> ${e}`)
})

const PORT = process.env.PORT || 8080

const engine = new ApolloEngine({
  apiKey: process.env.APOLLO_ENGINE_API_KEY,
  // Only send perf data to the remote server in production
  reporting: {
    disabled: process.env.NODE_ENV !== 'production'
  }
})

// Call engine.listen instead of app.listen(port)
engine.listen(
  {
    port: PORT,
    expressApp: app,
    graphqlPaths: ['/api/graphql']
  },
  () => {
    console.log('APP started on PORT : ' + PORT)
    console.log(`GraphiQL available at http://localhost:${PORT}/api/graphiql`)
  }
)
