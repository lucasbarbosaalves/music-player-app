import { IUser } from '../interfaces/IUser';

export function UserSpotifyDTO(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop().url,
  };
}
