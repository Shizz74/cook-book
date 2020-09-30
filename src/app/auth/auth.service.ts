import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  registerForm = document.querySelector('#registerForm');


  signup(email: string, password: string, userId: string, ) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/home']);
        firebase.database().ref(`users/${value.user.uid}`).set({
          key: value.user.uid,
          email: email,
          active: true,
          name: email,
          role: "standard",
          recipe: '',
          items: '',
          creationDate: value.user.metadata.creationTime
        });
        console.log('Success!', value);
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
          firebase.auth().onAuthStateChanged(function(user) {
          let userUid = user.uid;
          if (user) {
            return firebase.database().ref('/users/' + userUid).once('value').then(function(snapshot) {
              let userRole = (snapshot.val() && snapshot.val().role) || 'Anonymous';
              localStorage.setItem('role', userRole);
            });
          } else {
            console.log(this.err);
          }
        });
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