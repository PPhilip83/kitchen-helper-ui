import { Component } from '@angular/core';
import { FinderService } from './finder.service';
import { RecipeSuggestion } from 'src/app/models';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  isLoading = false;
  loadErrorMessage: string | null = null;
  maxMissingSelected = 0;
  suggestions: RecipeSuggestion[] = [];

  constructor(private finderService: FinderService) {}

  ngOnInit() {
    this.loadSuggestions();
  }

  setMaxMissing(val: number) {
    if (this.maxMissingSelected === val) return;
    this.maxMissingSelected = val;
    this.loadSuggestions();
  }

  loadSuggestions() {
    this.isLoading = true;
    this.loadErrorMessage = null;
    this.finderService.getSuggestions(this.maxMissingSelected).subscribe({
      next: (data) => {
        this.suggestions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load suggestions', err);
        this.loadErrorMessage = 'Failed to load suggestions.';
        this.isLoading = false;
      },
    });
  }

  get hasResults() {
    return this.suggestions?.length > 0;
  }

  trackById = (_: number, s: RecipeSuggestion) => s.recipeId;
}
