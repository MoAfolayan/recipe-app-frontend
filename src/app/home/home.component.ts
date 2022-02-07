import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
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
  recipesToDelete: IRecipe[];

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

    this.userRecipes$ = this.getUserRecipes();
  }

  getUserRecipes(): any {
    return this.userService.getUser()
      .pipe(
        tap(console.log),
        tap((user: IUser) => this.user$ = of(user)),
        mergeMap((user: IUser) => {
          if (user.id) {
            console.log(`user id: `, user.id)
            return this.recipeService.getUserRecipes(user.id);
          }
        })
      )
  }

  displaySelectedRecipe(event): void {
    this.selectedRecipe = event;
  }

  deleteRecipes(event): void {
    console.log(`event: `, event);
    this.recipeService.deleteRecipes(event)
      .subscribe();
  }

  logout() {
    this.auth0Service.logout();
    this.router.navigate(['login']);
  }

}
