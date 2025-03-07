import { IUser } from '../interfaces/IUser';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtist } from '../interfaces/IArtist';

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
