const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const tokenExtractor = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })

const server = http.createServer(app)

if (!module.parent) {
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
