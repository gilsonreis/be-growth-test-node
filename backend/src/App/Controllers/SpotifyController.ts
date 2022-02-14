import { Request, Response } from 'express'

class SpotifyController {
  public async index (request: Request, response: Response) {
    return response.status(200).json({
      status: 'success',
      data: {

      }
    })
  }
}

export default new SpotifyController()
