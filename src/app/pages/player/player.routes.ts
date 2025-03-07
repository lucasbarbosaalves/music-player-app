import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';

export const PlayerRoute: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.component').then((c) => c.HomeComponent),
      },
    ],
  },
];
