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
      this.router.navigate(['/player']);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.loginUrl();
  }
}
