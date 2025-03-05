import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.validateTokenUrlCallback();
  }

  validateTokenUrlCallback() {
    const token = this.spotifyService.tokenUrlCallback();
    if (!!token) {
      this.spotifyService.setAcessTokenApi(token);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.loginUrl();
  }
}
