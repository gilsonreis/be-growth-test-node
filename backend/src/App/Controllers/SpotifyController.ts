import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import BeerRepository from '@repositories/BeerRepository'
import axios from 'axios'
import { request as request_http } from 'http'

class SpotifyController {
  public async index (request: Request, response: Response) {
    const beerRepository = getCustomRepository(BeerRepository)
    const beer = await beerRepository.getBeerByTemp(-2)

    

    return response.status(200).json({
      status: 'success',
      data:
        {
          beer
        }
    })
  }
}

export default new SpotifyController()
