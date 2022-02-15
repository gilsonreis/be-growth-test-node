import { Router } from 'express'
import BeerController from '@controllers/BeerController'
import BeerValidator from '@validators/Beer/BeerValidator'

const BeerRouter:Router = Router()

BeerRouter.get('/beer', BeerController.index)
BeerRouter.get('/beer/:id', BeerController.view)
BeerRouter.post('/beer', BeerValidator, BeerController.store)
BeerRouter.put('/beer/:id', BeerValidator, BeerController.update)
BeerRouter.delete('/beer/:id', BeerController.destroy)

export default BeerRouter
