import { Component } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { RecipeService } from './recipes.service';
import { Recipe } from 'src/app/models';

type RecipesViewModel =
  | { state: 'loading' }
  | { state: 'error'; errorMessage: string }
  | { state: 'loaded'; recipes: Recipe[] };

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  recipesViewModel$: Observable<RecipesViewModel>;
  selectedRecipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {
    this.recipesViewModel$ = this.recipeService.getAllRecipes().pipe(
      map(
        (recipes) =>
          ({ state: 'loaded', recipes: recipes ?? [] } as RecipesViewModel)
      ),
      startWith({ state: 'loading' } as RecipesViewModel),
      catchError(() =>
        of({
          state: 'error',
          errorMessage: 'Failed to load recipes.',
        } as RecipesViewModel)
      )
    );
  }

  handleRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
  handleCloseDetails() {
    this.selectedRecipe = null;
  }
}
