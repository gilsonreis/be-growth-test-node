import axios from 'axios'
import 'dotenv/config'

class SpotifyService {
  static async getCredencial () {
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET

    const result = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(client_id + ':' + client_secret).toString('base64')}`
      }
    })

    return await result.data
  }
}

export default SpotifyService
