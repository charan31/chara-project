import pino from 'express-pino-logger'

// Add Middlewares
const LogMiddleware = pino({ name: 'charan-project'})

module.exports =  { LogMiddleware,
  Log: LogMiddleware.logger }
