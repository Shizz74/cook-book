import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  loginError: boolean;
  public passError: boolean;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
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
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err);
        if (err.code == "auth/user-not-found") {
          this.loginError = true;
          // const wrognLogin = document.querySelector("#wrongLoginPopup");
          // wrognLogin.classList.add('popupOn');
          // wrognLogin.classList.remove("popupOff");
          setTimeout(function () {
            this.loginError = false;
            // wrognLogin.classList.remove("popupOn");
            // wrognLogin.classList.add('popupOff');
          }, 3000);
        }
        if (err.code == "auth/wrong-password") {
          this.passError = true;
          // const wrongPassword = document.querySelector("#wrongPasswordPopup");
          // wrongPassword.classList.add('popupOn');
          // wrongPassword.classList.remove("popupOff");
          setTimeout(function () {
            this.passError = false;
            // wrongPassword.classList.remove("popupOn");
            // wrongPassword.classList.add('popupOff');
          }, 3000);
        }

      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}