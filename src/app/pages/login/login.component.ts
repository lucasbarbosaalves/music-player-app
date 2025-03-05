import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService) {}

  openLoginPage() {
    window.location.href = this.spotifyService.loginUrl();
  }
}
