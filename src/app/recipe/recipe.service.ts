import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeUrl: string = 'http://localhost:5000/api/recipes';

  constructor(private http: HttpClient) { }

  getRecipeByRecipeId(id: number): IRecipe {
    return {
      id: 1,
      name: 'Chocolate Truffles',
      ingredients: [
        {
          id: 1,
          name: 'Chocolate',
          recipeId: 2
        },
        {
          id: 2,
          name: 'Caramel',
          recipeId: 2
        },
        {
          id: 3,
          name: 'White Chocolate',
          recipeId: 2
        }
      ],
      userId: 1
    }
  }

  getUserRecipes(id: number): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${this.recipeUrl}/userid/${id}`);
  }
}
