import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const AuthGuard: CanMatchFn = async (route, segments) => {
  const router = inject(Router);
  const spotifyService = inject(SpotifyService);

  const token = localStorage.getItem('token');

  if (!token) {
    return Unauthenticated(router);
  }

  try {
    const userLoaded = await spotifyService.loadUser();
    return userLoaded ? true : Unauthenticated(router);
  } catch (error) {
    return Unauthenticated(router);
  }
};

export const Unauthenticated = (router: Router) => {
  localStorage.clear();
  router.navigate(['/login']);
  return false;
};
