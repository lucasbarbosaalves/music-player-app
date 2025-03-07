import { Component } from '@angular/core';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopArtistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
