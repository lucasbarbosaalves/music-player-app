import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import {
  PlaylistSpotifyDTO,
  SpotifyArtistDTO,
  SpotifyTrackDTO,
  UserSpotifyDTO,
} from '../commoms/helper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';
import { SpotifyConfig } from '../../environments/environment';
import { IMusic } from '../interfaces/IMusic';

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

  async getTopArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({
      limit,
    });

    return artists.items.map((x) => SpotifyArtistDTO(x));
  }

  async getMusics(offset = 0, limit = 50): Promise<IMusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });

    return musics.items.map((music) => SpotifyTrackDTO(music.track));
  }

  async playMusic(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }
  async getActualMusic(): Promise<IMusic> {
    const music = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackDTO(music.item);
  }
  async searchMusic(query: string): Promise<IMusic[]> {
    const result = await this.spotifyApi.searchTracks(query);
    return result.tracks.items.map((track) => SpotifyTrackDTO(track));
  }

  async backMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  async pause() {
    await this.spotifyApi.pause();
  }

  async play() {
    await this.spotifyApi.play();
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
