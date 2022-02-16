import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import BeerRepository from '@repositories/BeerRepository'
import SpotifyService from '@services/SpotifyService'

class SpotifyController {
  public async getPlayLists (request: Request, response: Response) {
    const { temp } = request.body
    const beerRepository = getCustomRepository(BeerRepository)
    const beer = await beerRepository.getBeerByTemp(temp)
    const beer_type = beer[0].beer_type

    const spotifyService = new SpotifyService()

    const cred = await spotifyService.getCredencial()
    spotifyService.setAccessToken(cred)
    const playlists = await spotifyService.getPlayListsByName(beer_type)

    const pl_listagem = {
      beerStyle: beer_type,
      playlists: []
    }

    let i = 0
    for (const playlist of playlists.playlists.items) {
      const tracks = await spotifyService.getTracksFromPlaylist(playlist.id)

      pl_listagem.playlists.push({
        name: playlist.name,
        tracks: tracks
      })

      i++
      if (i >= 3) {
        break
      }
    }

    return response.status(200).json({
      status: 'success',
      data: pl_listagem
    })
  }
}

export default new SpotifyController()
