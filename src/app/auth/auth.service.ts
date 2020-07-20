import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  const registerForm = document.querySelector('#registerForm');

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        return db.collections('users').doc(value.user.uid).set({
          nick: registerForm['nick'].value;
        })
        console.log('Success!', value);
        this.router.navigate(['/login']);
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