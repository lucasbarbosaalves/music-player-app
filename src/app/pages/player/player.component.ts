import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftBarComponent } from '../../components/left-bar/left-bar.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [RouterOutlet, LeftBarComponent],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {}
