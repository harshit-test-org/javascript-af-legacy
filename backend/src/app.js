import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import Raven from './lib/raven'
import session from 'express-session'
import compression from 'compression'
import connectMongo from 'connect-mongo'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import authRoutes from './routes/auth'
import security from './lib/security'

const MongoStore = connectMongo(session)

const User = mongoose.model('User')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const app = express()
app.set('trust proxy', 1)
app.use(Raven.requestHandler())
export const sessionParser = session({
  secret: process.env.SECRET,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15552000000
  }, // 6 months
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})
security(app)
app.use(compression())
app.use(sessionParser)
const corsMW = cors({
  origin: process.env.FRONT_END,
  credentials: true
})

app.use(corsMW)
app.options('*', corsMW)
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(async (req, res, next) => {
  if (req.session.user) {
    try {
      const user = await User.findById(req.session.user)
      req.user = user
    } catch (e) {
      return next()
    }
  }
  return next()
})

function ensureLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(403).json({ error: 401, msg: 'Not Authorized' })
  }
}
app.use(morgan('combined'))

app.get('/api/me', ensureLoggedIn, (req, res) => {
  const { email, name, photoURL, bio, _id } = req.user
  res.json({
    _id,
    email,
    name,
    photoURL,
    bio
  })
})
app.get('/api/logout', (req, res) => {
  delete req.session.user
  res.redirect(process.env.FRONT_END)
})
app.use('/api/auth/github', authRoutes)

app.use(
  '/api/graphql',
  ensureLoggedIn,
  express.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    },
    tracing: true,
    cacheControl: true
  }))
)

app.get(
  '/api/graphiql',
  graphiqlExpress({
    endpointURL: '/api/graphql',
    subscriptionsEndpoint: `ws://localhost:8080/api/subscriptions`
  })
)

app.use('/', (req, res) => {
  res.redirect(process.env.NODE_ENV === 'production' ? 'https://javascript.af' : 'http://localhost:3000')
})

app.use(Raven.errorHandler())

app.use((err, req, res, next) => {
  if (err) {
    console.error(err)
    res.status(500).json({
      message: 'Internal Server Error',
      errorId: res.sentry
    })
  } else {
    return next()
  }
})

process.on('unhandledRejection', async err => {
  console.error('Unhandled rejection', err)
  try {
    await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    console.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

process.on('uncaughtException', async err => {
  console.error('Uncaught exception', err)
  try {
    await new Promise(resolve => Raven.captureException(err, resolve))
  } catch (err) {
    console.error('Raven error', err)
  } finally {
    process.exit(1)
  }
})

export default app
