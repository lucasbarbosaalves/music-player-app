import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';
import { newArtist } from '../../commoms/factories';

@Component({
  selector: 'app-top-artist',
  standalone: true,
  imports: [],
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent implements OnInit {
  topArtist: IArtist = newArtist();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    try {
      const artists = await this.spotifyService.getTopArtists(1, 'long_term');
      if (artists && artists.length > 0) {
        this.topArtist = artists[0];
      }
    } catch (error) {
      console.error('Error loading top artist:', error);
    }
  }
}
