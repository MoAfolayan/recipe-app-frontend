import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Input() userRecipes: Recipe[];
  @Output() selectedRecipeEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  viewRecipeDetails(userRecipe: Recipe): void {
    this.selectedRecipeEvent.emit(userRecipe);
  }

}
