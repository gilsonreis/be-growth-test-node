import axios, { AxiosResponse } from 'axios'
import 'dotenv/config'

class SpotifyService {
  public access_token;
  async getCredencial (): Promise<AxiosResponse> {
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET

    const result = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(client_id + ':' + client_secret).toString('base64')}`
      }
    })

    return result.data.access_token
  }

  setAccessToken (access_token) {
    this.access_token = access_token
  }

  public async getPlayListsByName (name: string): Promise<AxiosResponse> {
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=playlist`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.access_token}`
      }
    })

    return result.data
  }

  public async getTracksFromPlaylist (id: string): Promise<any[]> {
    const result = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.access_token}`
      }
    })
    const tracks = result.data.items
    return SpotifyService.organizeTracks(tracks)
  }

  private static organizeTracks (tracks) {
    const tracks_list = []
    for (const track of tracks) {
      tracks_list.push(track?.track?.album?.name)
    }
    return tracks_list
  }
}

export default SpotifyService
