import { Request, Response } from 'express'

import { getCustomRepository } from 'typeorm'
import BeerRepository from '@repositories/BeerRepository'
import BeerEntity from '@models/BeerEntity'

class BeerController {
  public async index (request: Request, response: Response) {
    try {
      const beerRepository = getCustomRepository(BeerRepository)

      const beers = await beerRepository.getAll()
      return response.status(200).json({
        status: 'success',
        data: {
          beers: beers
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  public async view (request: Request, response: Response) {
    try {
      const beerRepository = getCustomRepository(BeerRepository)
      const { id } = request.params
      const beer = await beerRepository.findOne(id)

      return response.status(200).json({
        status: 'success',
        data: {
          beer: beer
        }
      })
    } catch {

    }
  }

  public async store (request: Request, response: Response) {
    try {
      const {
        beer_type,
        max_temp,
        min_temp
      } = request.body

      const beerRepository = getCustomRepository(BeerRepository)

      const beerExiste = await beerRepository.findOne({ where: { beer_type } })

      if (typeof beerExiste !== 'undefined') {
        return response.status(409).json({
          status: 'error',
          data: {
            title: 'Cerveja com esse nome já existe no banco de dados.'
          }
        })
      }

      let beer = new BeerEntity()
      beer.beer_type = beer_type
      beer.min_temp = min_temp
      beer.max_temp = max_temp
      beer = await beerRepository.save(beer)

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Cerveja cadastrada com sucesso!',
          beer: beer
        }
      })
    } catch {

    }
  }

  public async update (request: Request, response: Response) {
    try {
      const {
        beer_type,
        max_temp,
        min_temp
      } = request.body
      const { id } = request.params

      const beerRepository = getCustomRepository(BeerRepository)
      const beerExiste = await beerRepository.findOne({ where: { beer_type } })

      if (typeof beerExiste !== 'undefined') {
        return response.status(409).json({
          status: 'error',
          data: {
            title: 'Cerveja com esse nome já existe no banco de dados.'
          }
        })
      }

      let beer = await beerRepository.findOne(id)
      beer.beer_type = beer_type
      beer.min_temp = min_temp
      beer.max_temp = max_temp
      beer = await beerRepository.save(beer)

      return response.status(201).json({
        status: 'success',
        data: {
          title: 'Cerveja alterada com sucesso!',
          beer: beer
        }
      })
    } catch (err) {
      return response.status(400).json(err)
    }
  }

  public async destroy (request: Request, response: Response) {
    try {
      const { id } = request.params

      const beerRepository = getCustomRepository(BeerRepository)
      const beer = await beerRepository.findOne(id)
      await beerRepository.delete(beer)

      return response.status(200).json({
        status: 'success',
        data: {
          title: 'Cerveja deletada com sucesso!'
        }
      })
    } catch (err) {
      return response.status(404).json({
        status: 'fail',
        data: {
          title: 'Cerveja inexistente!'
        }
      })
    }
  }
}

export default new BeerController()
