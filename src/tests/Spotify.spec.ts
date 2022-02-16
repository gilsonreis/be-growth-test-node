import SpotifyService from '@services/SpotifyService'

import express from 'express'
import request from 'supertest'
import assert from "assert";

const app = express()

describe('Spotify tests', () => {
  it('Beer style should contain in playlist name', async () => {
    const spotifyService = new SpotifyService()
    const cred = await spotifyService.getCredencial()
    spotifyService.setAccessToken(cred)
    const playlists = await spotifyService.getPlayListsByName('Dunkel')

    for (let i = 0; i <= 3; i++) {
      const playlist_name = playlists['playlists'].items[i].name
      expect(playlist_name.toUpperCase()).toContain('Dunkel'.toUpperCase())
    }
  })
})
