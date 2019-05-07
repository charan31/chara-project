import pino from 'express-pino-logger'

// Add Middlewares -- for elastic search logging.
const LogMiddleware = pino({ name: 'charan-project'})

module.exports =  { LogMiddleware,
  Log: LogMiddleware.logger }
