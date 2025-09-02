import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = [];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  trackByPkId = (_: number, r: Recipe) => r.pkId;

  onSelect(recipe: Recipe) {
    if (!recipe) return;
    this.recipeSelected.emit(recipe);
  }
}
