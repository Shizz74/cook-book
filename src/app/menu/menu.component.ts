import { Component, OnInit, Input, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})


export class MenuComponent implements OnInit {
  title = 'angular-9-i18n';
  langs = ['en', 'pl'];

  
  constructor(
    private translateService: TranslateService,
    public authService: AuthService, 
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    ) { }

  ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
   if (this.langs.indexOf(browserlang) > -1) {
     this.translateService.setDefaultLang(browserlang);
   } else {
     this.translateService.setDefaultLang('en');
   }
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => this.router.navigate(['login']));
      localStorage.removeItem('currentUser');
      localStorage.removeItem('role');
  }

}
