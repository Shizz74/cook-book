import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Recipe } from './recipe'
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  userId = firebase.auth().currentUser.uid;

  private dbPath = '/users/' + this.userId + 'recipe';

  recipeRef: AngularFireList<Recipe> = null;

  constructor(private db: AngularFireDatabase) {
    this.recipeRef = db.list(this.dbPath);
   }

  form = new FormGroup({        
    name: new FormControl(''),
    desc: new FormControl(''),
  })


  saveRecipe(userId, name, desc) {
    firebase.database().ref('/recipe').set({
      name: name,
      desc: desc
    });
  }



  createRecipe(recipe: Recipe): void {
    this.recipeRef.push(recipe);
  }
}
