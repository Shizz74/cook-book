import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor( private firestore: AngularFirestore ) { }
  form = new FormGroup({        
    nick: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''), 
})


createUser(data) {
  return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("users")
          .add(data)
          .then(res => {}, err => reject(err));
  });
}
}
