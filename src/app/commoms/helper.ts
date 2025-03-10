import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../interfaces/IMusic';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IUser } from '../interfaces/IUser';

import { addMilliseconds, format } from 'date-fns';
import { newMusic } from './factories';

export function UserSpotifyDTO(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop().url,
  };
}

export function PlaylistSpotifyDTO(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop().url,
  };
}

export function SpotifyArtistDTO(
  spotifyArtist: SpotifyApi.ArtistObjectFull
): IArtist {
  return {
    id: spotifyArtist.id,
    imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop().url,
    name: spotifyArtist.name,
  };
}

export function SpotifyTrackDTO(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusic {
  if (!spotifyTrack) {
    return newMusic();
  }
  const timeConversion = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name,
    },
    artists: spotifyTrack.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    time: timeConversion(spotifyTrack.duration_ms),
  };
}
