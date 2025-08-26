import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { FinderComponent } from './pages/finder/finder.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'ingredients', pathMatch: 'full' },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'recipes', component: RecipesComponent },
      { path: 'finder', component: FinderComponent },
    ],
  },
  { path: '**', redirectTo: 'ingredients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
