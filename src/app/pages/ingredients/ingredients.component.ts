import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from 'src/app/models';
import { AddIngredientDialogComponent } from '../../shared/add-ingredient-dialog/add-ingredient-dialog.component';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent implements OnInit {
  cols = ['have', 'name', 'actions'];
  ingredients: Ingredient[] = [];
  isLoading = false;
  query = '';

  constructor(
    private dialog: MatDialog,
    private ingredientService: IngredientService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.reload();
  }

  openAdd() {
    this.dialog
      .open(AddIngredientDialogComponent, { width: '420px' })
      .afterClosed()
      .subscribe((ok) => ok && this.reload());
  }

  reload() {
    this.isLoading = true;
    this.ingredientService.list(this.query).subscribe({
      next: (d) => {
        this.ingredients = d;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Load ingredients failed', err);
        this.isLoading = false;
        this.snack.open('Failed to load ingredients', 'Dismiss', {
          duration: 2500,
        });
      },
    });
  }

  remove(i: Ingredient) {
    if (!i.pkId) return;
    this.ingredientService.remove(i.pkId).subscribe({
      next: () => {
        this.snack.open('Removed', 'OK', { duration: 1500 });
        this.reload();
      },
      error: (err) => {
        console.error('Remove failed', err);
        this.snack.open('Failed to remove', 'Dismiss', { duration: 2000 });
      },
    });
  }

  toggle(i: Ingredient) {
    if (!i.pkId) return;
    const previous = i.have;
    i.have = !i.have;
    this.ingredientService.toggleHave(i.pkId, i.have).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Toggle failed', err);
        i.have = previous;
        this.snack.open('Failed to update', 'Dismiss', { duration: 2000 });
      },
    });
  }
}
