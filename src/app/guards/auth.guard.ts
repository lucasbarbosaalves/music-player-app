import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      return this.unauthenticated();
    }

    return this.spotifyService.loadUser().then(
      (userLoaded) => {
        return userLoaded ? true : this.unauthenticated();
      },
      (error) => {
        return this.unauthenticated();
      }
    );
  }

  private unauthenticated(): boolean {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
