import { Router } from 'express'
import BeerController from '@controllers/BeerController'

const BeerRouter:Router = Router()

BeerRouter.get('/beer', BeerController.index)
BeerRouter.get('/beer/:id', BeerController.view)
BeerRouter.post('/beer', BeerController.store)
BeerRouter.put('/beer/:id', BeerController.update)
BeerRouter.delete('/beer/:id', BeerController.destroy)

export default BeerRouter
