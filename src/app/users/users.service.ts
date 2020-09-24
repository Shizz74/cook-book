import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { User } from './users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = '/users'

  userRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
   }

   getUsersList(): AngularFireList<User> {
    return this.userRef;
   }
  }