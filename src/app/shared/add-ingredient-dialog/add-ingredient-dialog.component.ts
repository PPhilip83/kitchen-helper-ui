import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientService } from 'src/app/pages/ingredients/ingredient.service';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
})
export class AddIngredientDialogComponent {
  name = '';
  have = false;
  isSaving = false;

  constructor(
    private ref: MatDialogRef<AddIngredientDialogComponent>,
    private ingredientService: IngredientService,
    private snack: MatSnackBar
  ) {}

  save() {
    const trimmed = this.name.trim();
    if (!trimmed || this.isSaving) return;

    this.isSaving = true;
    this.ingredientService
      .create({ name: trimmed, have: this.have })
      .subscribe({
        next: () => {
          this.snack.open('Ingredient added', 'OK', { duration: 1500 });
          this.ref.close(true);
        },
        error: (err) => {
          console.error('Create ingredient failed', err);
          this.isSaving = false;
          this.snack.open('Failed to add ingredient', 'Dismiss', {
            duration: 2500,
          });
        },
      });
  }
}
