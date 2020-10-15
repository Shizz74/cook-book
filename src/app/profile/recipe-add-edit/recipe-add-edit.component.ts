import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipe-add-edit',
  templateUrl: './recipe-add-edit.component.html',
  styleUrls: ['./recipe-add-edit.component.sass']
})
export class RecipeAddEditComponent implements OnInit {

  recipe: Recipe = new Recipe();
  submitted = false;

  constructor(
    public recipeService:RecipeService
    ) {}

  ngOnInit(): void {
  }

  name: string;
  desc: string;


  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }

  saveRecipe(){

  }


  save(){
    this.recipeService.createRecipe(this.recipe);
    this.recipe = new Recipe();
    console.log("przycisk działa");
    //ToDo
    //Save recipe.
  }


  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
