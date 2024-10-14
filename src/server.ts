import app from './app.js'
import http from 'http'

const server = http.createServer(app)

server.listen(8000, () =>
  console.log('🚀 Server is run on port 8000!')
)
