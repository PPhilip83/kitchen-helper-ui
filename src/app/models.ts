export interface RecipeIngredient {
  pkId: number;
  ingredientPkId: number;
  ingredientName: string;
  quantity: number | string;
  unit: string | null;
}

export interface Recipe {
  pkId: number;
  name: string;
  instructions: string;
  notes?: string | null;
  ingredients?: RecipeIngredient[];
}

export interface Ingredient {
  pkId: number;
  name: string;
  have: boolean;
}
