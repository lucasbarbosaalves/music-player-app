import { Component, OnInit } from '@angular/core';
import { ArtistsImageComponent } from '../artists-image/artists-image.component';
import { SpotifyService } from '../../services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';

@Component({
  selector: 'app-top-artists',
  imports: [ArtistsImageComponent],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss',
})
export class TopArtistsComponent implements OnInit {
  protected artists: IArtist[];
  constructor(private spotifyService: SpotifyService) {}
  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.getTopArtists(5);
  }
}
