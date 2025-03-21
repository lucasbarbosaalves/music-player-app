import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { TopArtistsComponent } from '../top-artists/top-artists.component';
import { PlayerCardComponent } from '../player-card/player-card.component';

@Component({
  selector: 'app-right-bar',
  imports: [SearchComponent, TopArtistsComponent, PlayerCardComponent],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.scss',
})
export class RightBarComponent {}
