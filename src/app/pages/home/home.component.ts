import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { RightBarComponent } from '../../components/right-bar/right-bar.component';
import { IMusic } from '../../interfaces/IMusic';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../services/player.service';
import { newMusic } from '../../commoms/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopArtistComponent,
    RightBarComponent,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  musics: IMusic[] = [];
  actualMusic: IMusic = newMusic();

  subsPools: Subscription[] = [];

  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.listMusics();
    this.getActualMusic();
  }

  ngOnDestroy(): void {
    this.subsPools.forEach((sub) => sub.unsubscribe());
  }

  async listMusics() {
    this.musics = await this.spotifyService.getMusics();
    console.log(this.musics);
  }

  getArtistFromMusics(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setActualMusic(music);
  }

  getActualMusic() {
    const sub = this.playerService.actualMusic.subscribe((music) => {
      this.actualMusic = music;
    });

    this.subsPools.push(sub);
  }
}
