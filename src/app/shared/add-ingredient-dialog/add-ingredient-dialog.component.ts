import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientService } from '../../core/ingredient.service';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
})
export class AddIngredientDialogComponent {
  name = '';
  have = false;
  constructor(
    private ref: MatDialogRef<AddIngredientDialogComponent>,
    private svc: IngredientService
  ) {}
  save() {
    this.svc
      .create({ name: this.name.trim(), have: this.have })
      .subscribe(() => this.ref.close(true));
  }
}
