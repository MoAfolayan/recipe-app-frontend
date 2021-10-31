import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IRecipe } from '../recipe/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { IUser } from '../user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$: Observable<IUser>;

  userRecipes$: Observable<IRecipe[]>;
  selectedRecipe: IRecipe;

  constructor(
    public auth0Service: AuthService,
    private router: Router,
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.auth0Service.user$
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe();

    this.user$ = this.getUser();
    this.userRecipes$ = this.getUserRecipes(1);
  }

  getUserRecipes(id: number): Observable<IRecipe[]> {
    return this.recipeService.getUserRecipes(id);
  }

  displaySelectedRecipe(event): void {
    this.selectedRecipe = event;
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:5000/api/user')
      .pipe(
        tap(x => console.log(x))
      )
  }

  logout() {
    this.auth0Service.logout();
    this.router.navigate(['login']);
  }

}
