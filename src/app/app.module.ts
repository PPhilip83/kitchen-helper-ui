import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './layout/shell/shell.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { FinderComponent } from './pages/finder/finder.component';
import { AddIngredientDialogComponent } from './shared/add-ingredient-dialog/add-ingredient-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    IngredientsComponent,
    RecipesComponent,
    FinderComponent,
    AddIngredientDialogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
