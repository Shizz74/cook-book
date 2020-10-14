import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe-add-edit/recipe.service'

@Component({
  selector: 'app-recipe-add-edit',
  templateUrl: './recipe-add-edit.component.html',
  styleUrls: ['./recipe-add-edit.component.sass']
})
export class RecipeAddEditComponent implements OnInit {

  constructor(
    public recipeService:RecipeService
    ) {}

  ngOnInit(): void {
  }

  name: string;
  desc: string;


  saveNewRecipe(){
    console.log("przycisk działa");
    //ToDo
    //Save recipe.
  }
}
