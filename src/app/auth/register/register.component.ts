import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

import { CreateAccountService } from "../../shared/create-account.service";
import * as firebase from 'firebase';

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
  userId: string;
  displayName: string;
  name: string;

  signup() {
    this.authService.signup(this.email, this.password, this.userId, this.displayName, this.name);
    this.email = this.password = '';
  }

  register(){
    this.signup();
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

}
