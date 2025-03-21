import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.validateTokenUrlCallback();
  }

  validateTokenUrlCallback() {
    const token = this.spotifyService.tokenUrlCallback();
    if (!!token) {
      this.spotifyService.setAcessTokenApi(token);
      this.router.navigate(['/player/home']);
    }
  }

  openLoginPage() {
    const loginUrl = this.spotifyService.loginUrl();
    if (this.isValidUrl(loginUrl)) {
      window.location.assign(loginUrl);
    } else {
      console.error('Invalid login URL');
    }
  }

  isValidUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === 'accounts.spotify.com';
    } catch (e) {
      return false;
    }
  }
}
