import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import BeerRepository from '@repositories/BeerRepository'
import axios from 'axios'
import { request as request_http } from 'http'
import SpotifyService from '@services/SpotifyService'

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

  public async getPlayLists (request: Request, response: Response) {
    const { temp } = request.body
    const beerRepository = getCustomRepository(BeerRepository)
    const beer = await beerRepository.getBeerByTemp(temp)

    const beer_type = beer[0].beer_type
    console.log(beer_type)
    const spotifyService = new SpotifyService()

    const cred = await spotifyService.getCredencial()
    console.log(cred)
    spotifyService.setAccessToken(cred)
    const playlists = await spotifyService.getPlayListsByName(beer_type)

    const tracks = []
    for (const playlist of playlists.playlists.items) {
      const track = await spotifyService.getTracksFromPlaylist(playlist.id)
      tracks.push(track)
    }

    return response.status(200).json({
      status: 'success',
      data: tracks
    })
  }
}

export default new SpotifyController()
