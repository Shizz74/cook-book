import { Component, OnInit, Input, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})


export class MenuComponent implements OnInit {
  title = 'angular-9-i18n';
  langs = ['en', 'pl'];
  
  constructor(private translateService: TranslateService, public authService: AuthService) { }

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

}
