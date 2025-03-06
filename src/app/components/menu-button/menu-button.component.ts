import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  imports: [CommonModule],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
})
export class MenuButtonComponent {
  @Input()
  description = 'teste';

  @Input()
  isSelect = false;

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
