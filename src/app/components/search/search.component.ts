import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { IMusic } from '../../interfaces/IMusic';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  recentSearch: string[] = ['Top Brasil', 'Rap Nacional', 'Trap', 'K-Pop'];
  field = '';
  searchResults: IMusic[] = [];
  showDropdown = false;

  constructor(private spotifyService: SpotifyService) {}

  search(input: string) {
    this.field = input;
    this.findSearch();
  }

  async findSearch() {
    if (this.field.trim() === '') {
      return;
    }

    try {
      this.searchResults = await this.spotifyService.searchMusic(this.field);
      this.updateRecentSearch(this.field);
      this.showDropdown = true;
    } catch (error) {
      console.error('Error searching music:', error);
    }
  }

  updateRecentSearch(search: string) {
    if (!this.recentSearch.includes(search)) {
      this.recentSearch.unshift(search);
      if (this.recentSearch.length > 5) {
        this.recentSearch.pop();
      }
    }
  }

  async playMusic(musicId: string) {
    try {
      await this.spotifyService.playMusic(musicId);
    } catch (error) {
      console.error('Error playing music:', error);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showDropdown = false;
    }
  }
}
