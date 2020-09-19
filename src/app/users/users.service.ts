import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  form = new FormGroup({        
    email: new FormControl(''),

})
}
