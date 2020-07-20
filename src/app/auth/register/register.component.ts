import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

import { CreateAccountService } from "../../shared/create-account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  constructor(private translateService: TranslateService, public authService: AuthService, public createAccountService:CreateAccountService) { }

  ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
   if (this.langs.indexOf(browserlang) > -1) {
     this.translateService.setDefaultLang(browserlang);
   } else {
     this.translateService.setDefaultLang('en');
   }
  }

  title = 'angular-9-i18n';
  langs = ['en', 'pl'];
  email: string;
  password: string;
  nick: string;


  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  createUser(){
    this.createAccountService.form.value.createUser = this.createUser;
    let data = this.createAccountService.form.value;
    
   this.createAccountService.createUser(data)
       .then(res => {
           /*do something here....
           maybe clear the form or give a success message*/
       });
  }

  register(){
    this.signup();
    this.createUser();
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

}
