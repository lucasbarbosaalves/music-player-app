import { Injectable } from '@angular/core';
import { IMusic } from '../interfaces/IMusic';
import { BehaviorSubject } from 'rxjs';
import { newMusic } from '../commoms/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  actualMusic = new BehaviorSubject<IMusic>(newMusic());
  isPlaying = new BehaviorSubject<boolean>(false);
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getActualMusic();
  }

  async getActualMusic() {
    clearTimeout(this.timerId);

    // Get a music
    const actualMusic = await this.spotifyService.getActualMusic();
    this.setActualMusic(actualMusic);

    // Searching for the current song every 3 seconds
    this.timerId = setInterval(async () => {
      await this.getActualMusic();
    }, 3000);
  }

  setActualMusic(music: IMusic) {
    this.actualMusic.next(music);
  }

  async backMusic() {
    await this.spotifyService.backMusic();
  }

  async pause() {
    await this.spotifyService.pause();
    this.isPlaying.next(false);
  }

  async play() {
    await this.spotifyService.play();
    this.isPlaying.next(true);
  }

  async nextMusic() {
    await this.spotifyService.nextMusic();
  }
}
