export interface RecipeIngredient {
  pkId?: number;
  ingredientPkId: number;
  ingredientName: string;
  quantity: number | { source: string; parsedValue: number };
  unit: string | null;
}

export interface Recipe {
  pkId?: number;
  name: string;
  instructions: string;
  notes?: string | null;
  ingredients?: RecipeIngredient[];
}

export interface Ingredient {
  pkId?: number;
  name: string;
  have: boolean;
}

export interface RecipeSuggestion {
  recipeId: number;
  recipeName: string;
  totalCount: number;
  missingCount: number;
  missingIngredientNames: string[];
}
