import { Component, OnInit } from '@angular/core';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IPlaylist } from '../../interfaces/IPlaylist';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [
    MenuButtonComponent,
    FontAwesomeModule,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss',
})
export class LeftBarComponent implements OnInit {
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  menuSelected = '';

  playlists: IPlaylist[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.searchPlaylists();
  }

  buttonClick(button: string) {
    this.menuSelected = button;
    this.router.navigateByUrl('player/home');
  }

  async searchPlaylists() {
    this.playlists = await this.spotifyService.getPlaylistsByUser();
  }
}
