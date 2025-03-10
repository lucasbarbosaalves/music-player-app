import { IUser } from '../interfaces/IUser';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../interfaces/IMusic';

export function newArtist(): IArtist {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}

export function newUser(): IUser {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    time: '',
    title: '',
  };
}
