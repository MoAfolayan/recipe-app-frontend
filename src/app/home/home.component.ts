import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IRecipe } from '../recipe/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

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
    private recipeService: RecipeService,
    private userService: UserService
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

  getUser(): Observable<IUser> {
    return this.userService.getUser();
  }

  getUserRecipes(userId: number): Observable<IRecipe[]> {
    return this.recipeService.getUserRecipes(userId);
  }

  displaySelectedRecipe(event): void {
    this.selectedRecipe = event;
  }

  logout() {
    this.auth0Service.logout();
    this.router.navigate(['login']);
  }

}
