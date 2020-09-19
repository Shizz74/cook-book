import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  name: string;
  logout() {
    throw new Error('Method not implemented.');
  }
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  registerForm = document.querySelector('#registerForm');

  signup(email: string, password: string, userId: string, name: string, displayName: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      
      .then(value => {
        console.log ( value.user.uid);
        console.log('Success!', value);
        this.router.navigate(['/home']);

      //   let currentUser = firebase.auth().currentUser
      //  currentUser.updateProfile({
      //     displayName: name,
      //   }).then(function() {
      //     console.log(currentUser.displayName);
      //   }).catch(function(error) {
      //     console.log(currentUser);
      //   });


        // value.user.displayName = this.name;
        console.log(name);
        firebase.database().ref(`users/${value.user.uid}`).set({
          email: email,
          name: displayName,
        });

      })   
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        localStorage.setItem('currentUser', "loggedin");
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log('Something went wrong:', err);
      });
  }

  public get loggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  } 
}