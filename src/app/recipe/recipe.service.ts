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

   getUserRecipes(id: number): Observable<IRecipe[]> {
      return this.http.get<IRecipe[]>(`${this.recipeUrl}/userid/${id}`);
   }

   deleteRecipes(recipesToDelete: IRecipe[]): void {
      for (let i = 0; i < recipesToDelete.length; i++) {
         this.http.post(`${this.recipeUrl}/delete`, recipesToDelete[i]);
      }
   }
}
