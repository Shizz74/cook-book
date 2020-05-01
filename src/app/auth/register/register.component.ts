import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private translateService: TranslateService, public authService: AuthService) { }

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


  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

}
