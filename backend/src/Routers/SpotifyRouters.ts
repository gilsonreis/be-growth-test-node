import { Router } from 'express'
import SpotifyController from '@controllers/SpotifyController'

const SpotifyRouter:Router = Router()

SpotifyRouter.get('/spotify', SpotifyController.index)

export default SpotifyRouter
