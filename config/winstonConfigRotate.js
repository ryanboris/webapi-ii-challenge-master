//winston-config-rotate.js
const path = require('path')
const fs = require('fs')
const appRoot = require('app-root-path')
const winston = require('winston')
const clfDate = require('clf-date')
require('winston-daily-rotate-file')

// ensure log directory exists
const logDirectory = path.resolve(`${appRoot}`, 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const infofile = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: path.resolve(logDirectory, 'application-%DATE%-info.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '14d' // keep logs for 14 days
})

infofile.on('rotate', function(oldFilename, newFilename) {
  // do something fun
})

const errorfile = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: path.resolve(logDirectory, 'application-%DATE%-error.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d' // keep logs for 30 days
})

errorfile.on('rotate', function(oldFilename, newFilename) {
  // do something fun
})

const logger = winston.createLogger({
  transports: [
    infofile,
    errorfile
  ]
})

// create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message)
  }
}

// create a format method for winston, it is similar with 'combined' format in morgan
logger.combinedFormat = function(err, req, res) {
  // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  return `${req.ip} - - [${clfDate(
    new Date()
  )}] \"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\" ${err.status ||
    500} - ${req.headers['user-agent']}`
}

module.exports = logger
