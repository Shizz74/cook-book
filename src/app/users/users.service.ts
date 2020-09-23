import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Users } from './users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = '/users'

  userRef: AngularFireList<Users> = null;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
   }

   getUsersList(): AngularFireList<Users> {
    return this.userRef;
   }
  }