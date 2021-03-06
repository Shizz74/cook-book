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
        let currentdate = new Date(); 
        let dateTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        firebase.database().ref(`users/${value.user.uid}`).set({
          key: value.user.uid,
          email: email,
          active: true,
          name: email,
          role: "standard",
          recipe: '',
          items: '',
          creationDate: dateTime,
          lastLogin: dateTime
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
          firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
              let active = (snapshot.val() && snapshot.val().active);
              console.log(active);
              let userRole = (snapshot.val() && snapshot.val().role) || 'Anonymous';
              if(active){
                  localStorage.setItem('role', userRole);
                  let currentdate = new Date(); 
                  let lastLogin = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                firebase.database().ref(`users/${value.user.uid}`).update({
                  lastLogin: lastLogin
                });
              }else {
                firebase.auth().signOut()
                .then(() => {
                  this.router.navigate(['login']);
                });
                console.log("wylogowanie");
                localStorage.removeItem('currentUser');
                localStorage.removeItem('role');
              }
            });
          }else {

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