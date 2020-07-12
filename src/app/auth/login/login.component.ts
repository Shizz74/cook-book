import { Component, OnInit, Input, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})


export class LoginComponent implements OnInit {

  title = 'angular-9-i18n';
  langs = ['en', 'pl'];
  email: string;
  password: string;

  

  
  constructor(private translateService: TranslateService, public authService: AuthService) { }

  

  ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
   if (this.langs.indexOf(browserlang) > -1) {
     this.translateService.setDefaultLang(browserlang);
   } else {
     this.translateService.setDefaultLang('en');
   }
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  // logout() {
  //   this.authService.logout();
  // }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

}
