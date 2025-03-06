import { Injectable } from '@angular/core';
import { SpotifyConfig } from '../../environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import { PlaylistSpotifyDTO, UserSpotifyDTO } from '../commoms/helper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async loadUser() {
    if (!!this.user) {
      return true;
    }

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.setAcessTokenApi(token);
      await this.getSpotifyUserInfo();
      return true;
    } catch (exception) {
      return false;
    }
  }

  async getSpotifyUserInfo() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = UserSpotifyDTO(userInfo);
  }

  loginUrl() {
    const params = new URLSearchParams({
      client_id: SpotifyConfig.clientId,
      redirect_uri: SpotifyConfig.redirectUrl,
      scope: SpotifyConfig.scopes.join(' '),
      response_type: 'token',
      show_dialog: 'true',
    });

    return `${SpotifyConfig.authEndpoint}?${params.toString()}`;
  }

  tokenUrlCallback() {
    if (!window.location.hash) {
      return '';
    }
    const paramsReceived = window.location.hash.substring(1).split('&');

    return paramsReceived[0].split('=')[1];
  }

  setAcessTokenApi(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getPlaylistsByUser(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, {
      offset,
      limit,
    });

    console.log(playlists);

    return playlists.items.map((item) => PlaylistSpotifyDTO(item));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
