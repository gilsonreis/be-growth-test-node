import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

function ErrorMiddleware (error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {
  console.debug('ERROR', error)
  return next(error)
}

export default ErrorMiddleware
