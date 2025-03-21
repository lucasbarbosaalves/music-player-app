import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusic } from '../../interfaces/IMusic';
import { newMusic } from '../../commoms/factories';
import { PlayerService } from '../../services/player.service';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-player-card',
  imports: [FontAwesomeModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  music: IMusic = newMusic();

  backIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;
  isPlaying = false;

  subs: Subscription[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getCurrentMusic();
    this.getPlayingStatus();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.actualMusic.subscribe((music) => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  getPlayingStatus() {
    const sub = this.playerService.isPlaying.subscribe((status) => {
      this.isPlaying = status;
    });

    this.subs.push(sub);
  }

  backMusic() {
    this.playerService.backMusic();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }

  nextMusic() {
    this.playerService.nextMusic();
  }
}
