import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artists-image',
  imports: [],
  templateUrl: './artists-image.component.html',
  styleUrl: './artists-image.component.scss',
})
export class ArtistsImageComponent {
  @Input()
  image: string;

  @Output()
  protected click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
