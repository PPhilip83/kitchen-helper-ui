import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe, RecipeIngredient } from 'src/app/models';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: Recipe | null = null;
  @Output() requestClose = new EventEmitter<void>();

  close() {
    this.requestClose.emit();
  }

  formatQuantity(ing: RecipeIngredient): string {
    const q: any = ing.quantity;
    const n = typeof q === 'number' ? q : Number(q?.parsedValue ?? q?.source);
    return Number.isFinite(n) ? `${n}` : q?.source ?? '';
  }
}
