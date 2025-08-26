// pages/ingredients/ingredients.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient, IngredientService } from '../../core/ingredient.service';
import { AddIngredientDialogComponent } from '../../shared/add-ingredient-dialog/add-ingredient-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  cols = ['have', 'name', 'actions'];
  query = '';

  constructor(
    private svc: IngredientService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}
  ngOnInit() {
    this.reload();
  }

  reload() {
    this.svc.list(this.query).subscribe((d) => (this.ingredients = d));
  }
  openAdd() {
    this.dialog
      .open(AddIngredientDialogComponent, { width: '420px' })
      .afterClosed()
      .subscribe((ok) => ok && this.reload());
  }
  toggle(i: Ingredient) {
    if (!i.pkId) return;
    this.svc.toggleHave(i.pkId, !i.have).subscribe(() => {
      i.have = !i.have;
    });
  }
  remove(i: Ingredient) {
    if (!i.pkId) return;
    this.svc.remove(i.pkId).subscribe(() => {
      this.snack.open('Removed', 'OK', { duration: 1500 });
      this.reload();
    });
  }
}
