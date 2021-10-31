import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Recipe } from '../recipe/recipe';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileJson: string = null;
  userJson: string = null;
  user: any;

  userRecipes: Recipe[];
  selectedRecipe: Recipe;

  constructor(
    public auth0Service: AuthService, 
    private router: Router, 
    private http: HttpClient,
    private recipeService: RecipeService
    ) { }

  ngOnInit(): void {
    this.auth0Service.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );

    this.getUserRecipes(1);
  }

  getUserRecipes(id: number): void {
    this.userRecipes = this.recipeService.getUserRecipes(1);
  }

  displaySelectedRecipe(event): void {
    this.selectedRecipe = event;
  }

  getData(): any {
    this.http.get('http://localhost:5000/api/user')
      .subscribe(
        result => {
          this.userJson = JSON.stringify(result, null, 2);
          this.user = result;
        },
        err => console.error(`Error: ${err}`),
        () => console.log('Observer got a complete notification')
      );
  }

  logout() {
    this.auth0Service.logout();
    this.router.navigate(['login']);
  }

}
