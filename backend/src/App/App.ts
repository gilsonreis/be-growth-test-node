import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import { createConnection } from 'typeorm'
import { pagination } from 'typeorm-pagination'
import 'express-async-errors'

import routes from '@config/Routes'
import ErrorMiddleware from '@middlewares/ErrorMiddleware'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.pagination()
    this.routes()
    this.errorMiddleware()
  }

  private pagination () {
    this.express.use(pagination)
  }

  private routes () {
    for (const route of routes) {
      this.express.use(route)
    }
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private errorMiddleware (): void {
    this.express.use(ErrorMiddleware)
  }

  private database (): void {
    createConnection().then(() => console.debug('DATABASE', 'Database was Connected successful'))
  }
}

export default new App().express
