import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

function ErrorMiddleware (error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {
  console.debug('ERROR', error)
  console.debug('REQUEST', request.statusCode, request.statusMessage)
  console.debug('RESPONSE', response.statusCode, response.statusMessage)
  return next(error)
}

export default ErrorMiddleware
