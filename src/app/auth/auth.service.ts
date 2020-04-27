import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFire: AngularFireAuth) { }


  login(email: string, password: string) {
    console.log(email);
    console.log(password);
  }

  signup(nick: string, email: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(email, password).then(value => {
      console.log(value);
    }).catch(err => {
      console.log(err);
    });
    console.log(nick);
    console.log(email);
    console.log(password);
  }

  logout() {

  }
}
