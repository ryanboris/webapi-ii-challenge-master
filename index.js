const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const postsRouter = require('./api/postsServer.js')

// const winston = require('./config/winstonConfigStream.js')
const winston = require('./config/winstonConfigStreamConsole.js')
// const winston = require('./config/winstonConfigRotate.js')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('short'))

app.use('/api/posts', postsRouter)

const logDirectory = path.join(__dirname, 'logs')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// setup the winston stream
app.use(morgan('combined', { stream: winston.stream }))

app.get('/', function(req, res) {
  res.send('hello, world!')
})

app.use(function(req, res, next) {
  //res.status(404).send("File not found!");
  next(new Error('File not found'))
})

app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res))
  res.status(err.status || 500).send('Internal server error.')
})

app.listen(5000, function() {
  console.log('Web Server started on port 5000')
})
