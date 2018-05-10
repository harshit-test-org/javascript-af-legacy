const express = require('express')
const next = require('next')
const { join } = require('path')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: join(__dirname) })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', '/service-worker.js')
    return app.serveStatic(req, res, filePath)
  })

  server.get('/repo/:id', (req, res) => {
    return app.render(req, res, '/template', { id: req.params.id })
  })

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
