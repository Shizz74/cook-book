import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  loginError: number = 1;
  passError: number = 1;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
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
        const wrognLogin = document.querySelector("#wrongLoginPopup");
        const wrongPassword = document.querySelector("#wrongPasswordPopup");
        const loginForm = document.querySelector("#loginForm");
        const langBtn = document.querySelector(".btn-lang-form");
        if (err.code == "auth/user-not-found") {
          console.log(loginForm);
          wrognLogin.classList.add('popupOn');
          wrognLogin.classList.remove("popupOff");
          loginForm.classList.add("popupOff");
          langBtn.classList.add("popupOff");
          setTimeout(function () {
            wrognLogin.classList.remove("popupOn");
            wrognLogin.classList.add('popupOff');
            loginForm.classList.remove("popupOff");
            langBtn.classList.remove("popupOff");
          }, 2500);
        }
        if (err.code == "auth/wrong-password") {
          wrongPassword.classList.add('popupOn');
          wrongPassword.classList.remove("popupOff");
          loginForm.classList.add("popupOff");
          langBtn.classList.add("popupOff");
          setTimeout(function () {
            wrongPassword.classList.remove("popupOn");
            wrongPassword.classList.add('popupOff');
            loginForm.classList.remove("popupOff");
            langBtn.classList.remove("popupOff");
          }, 2500);
        }

      });
  }

  public get loggedIn(): boolean {  
    return (localStorage.getItem('currentUser') !== null);  
  } 
}