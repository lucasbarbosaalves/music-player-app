import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../interfaces/IUser';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  logoutIcon = faSignOut;
  user: IUser = null;

  constructor(private spotifyService: SpotifyService) {}
  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout() {
    this.spotifyService.logout();
  }
}
