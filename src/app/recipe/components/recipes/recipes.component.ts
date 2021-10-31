import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../../recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Input() userRecipes$: Observable<IRecipe[]>;
  @Output() selectedRecipeEvent: EventEmitter<IRecipe> = new EventEmitter<IRecipe>();

  constructor() { }

  ngOnInit(): void {
  }

  viewRecipeDetails(userRecipe: IRecipe): void {
    this.selectedRecipeEvent.emit(userRecipe);
  }

}
