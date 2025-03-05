import { Injectable } from '@angular/core';
import { SpotifyConfig } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor() {}

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
}
