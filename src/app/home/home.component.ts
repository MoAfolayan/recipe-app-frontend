import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { concatMap, mergeMap, tap } from 'rxjs/operators';
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
  userRecipes$: Observable<Observable<IRecipe[]>>;
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
      tap(console.log)
    )
    .subscribe();

    this.user$ = this.getUser();
    this.userRecipes$ = this.getUserRecipes();
  }

  getUser(): Observable<IUser> {
    return this.userService.getUser()
    .pipe(
      tap(console.log)
    );
  }

  getUserRecipes(): any {
    return this.userService.getUser()
    .pipe(
      mergeMap((user: IUser) => {
        if (user.id) {
          console.log(user.id)
          return this.recipeService.getUserRecipes(user.id);
        }
      })
    )
  }

  displaySelectedRecipe(event): void {
    this.selectedRecipe = event;
  }

  logout() {
    this.auth0Service.logout();
    this.router.navigate(['login']);
  }

}
