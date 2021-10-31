import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipeByRecipeId(id: number): Recipe {
    return {
      id: 1,
      name: 'Chocolate Truffles',
      recipeItems: [
        {
          id: 1,
          name: 'Chocolate'
        },
        {
          id: 2,
          name: 'Caramel'
        },
        {
          id: 3,
          name: 'White Chocolate'
        }
      ]
    }
  }

  getUserRecipes(id: number): Recipe[] {
    return [
      {
        id: 1,
        name: 'Chocolate Truffles',
        recipeItems: [
          {
            id: 1,
            name: 'Chocolate'
          },
          {
            id: 2,
            name: 'Caramel'
          },
          {
            id: 3,
            name: 'White Chocolate'
          }
        ]
      },
      {
        id: 2,
        name: 'Banana pudding',
        recipeItems: [
          {
            id: 4,
            name: 'Bananas'
          },
          {
            id: 5,
            name: 'Pudding'
          },
          {
            id: 6,
            name: 'Cream'
          },
          {
            id: 7,
            name: 'Whipped cream'
          }
        ]
      }
    ]
  }
}
