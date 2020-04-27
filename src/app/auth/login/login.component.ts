import { Component, OnInit } from '@angular/core';
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

  constructor(private translateService: TranslateService, private authService: AuthService) { }

  ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
   if (this.langs.indexOf(browserlang) > -1) {
     this.translateService.setDefaultLang(browserlang);
   } else {
     this.translateService.setDefaultLang('en');
   }
  }


  login(formData: NgForm){
    this.authService.login(formData.value.email, formData.value.password);
  }

  signup(formData: NgForm){
    this.authService.signup(formData.value.nick, formData.value.email, formData.value.password);
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

}
