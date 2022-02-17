import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { TwitterComponent } from './MainPage/Twitter/twitter.component';
import { HomeComponent } from './MainPage/Home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { SingleArticleComponent } from './SingleArticle/single-article.component';
import { ConnectionGitHubComponent } from './connection-git-hub/connection-git-hub.component';
import { CreateNewArticleComponent } from './create-new-article/create-new-article.component';
import { MainAdminComponent } from './AdminPage/main-admin/main-admin.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';

const routes: Routes = [
  { path: 'newarticle', component: CreateNewArticleComponent },
   { path: 'connection', component: ConnectionGitHubComponent },
  { path: 'googlemap', component: GooglemapComponent },
  { path: 'twitter', component: TwitterComponent },
   { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'articles/:userId', component: UserArticlesComponent },
  { path: 'article/:id', component: SingleArticleComponent },
  { path: 'adminboard', component: MainAdminComponent },
  { path: 'favorites/:userId', component: UserFavoritesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
