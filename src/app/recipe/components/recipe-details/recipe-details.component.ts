import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from '../../recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() selectedRecipe: IRecipe = null;

  constructor() { }

  ngOnInit(): void {
  }

  editRecipe() {

  }

  deleteRecipe() {
    
  }

}
