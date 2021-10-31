import { Ingredient } from './ingredient';

export interface Recipe {
    id: number;
    name: string;
    recipeItems: Ingredient[];
}
