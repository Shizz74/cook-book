import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from '././users/users-list/users-list.component'
import { UserRecipeComponent } from './profile/user-recipe/user-recipe.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { RecipeAddEditComponent } from './profile/recipe-add-edit/recipe-add-edit.component';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: {
    authGuardPipe: redirectUnauthorizedToHome
  }},
  { path: 'users-list', component: UsersListComponent, canActivate: [AngularFireAuthGuard], data: {
    authGuardPipe: redirectUnauthorizedToHome
  }},
  { path: 'user-recipe', component: UserRecipeComponent, canActivate: [AngularFireAuthGuard], data: {
    authGuardPipe: redirectUnauthorizedToHome
  }},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AngularFireAuthGuard], data: {
    authGuardPipe: redirectUnauthorizedToHome
  }},
  { path: 'user-recipe/add-edit', component: RecipeAddEditComponent, canActivate: [AngularFireAuthGuard], data: {
    authGuardPipe: redirectUnauthorizedToHome
  }},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
