import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Recipe } from './recipe'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private dbPath = '/users/items';

  recipeRef: AngularFireList<Recipe> = null;

  constructor(private db: AngularFireDatabase) { }

  form = new FormGroup({        
    name: new FormControl(''),
    desc: new FormControl(''),
  })


  createRecipe(recipe: Recipe): void {
    this.recipeRef.push(recipe);
  }
}
