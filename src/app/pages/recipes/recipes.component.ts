import { Component } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { Recipe, RecipeService } from './recipes.service';

type Vm =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'loaded'; recipes: Recipe[] };

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  vm$: Observable<Vm>;

  constructor(private recipeService: RecipeService) {
    this.vm$ = this.recipeService.getAllRecipes().pipe(
      map((recipes) => ({ state: 'loaded', recipes } as Vm)),
      startWith({ state: 'loading' } as Vm),
      catchError((err) =>
        of({ state: 'error', message: 'Failed to load recipes.' } as Vm)
      )
    );
  }
}
