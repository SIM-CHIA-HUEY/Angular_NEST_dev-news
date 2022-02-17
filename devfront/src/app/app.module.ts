import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmallCardArticlesComponent } from './MainPage/small-card-articles/small-card-articles.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { UsersManagementComponent } from './AdminPage/users-management/users-management.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AgmCoreModule } from '@agm/core';
import { TagsSidebarComponent } from './MainPage/tags-sidebar/tags-sidebar.component';
import { HomeComponent } from './MainPage/Home/home.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// app/app.module.ts
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { MyMaterialModule } from './material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from './login-page/login-page.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchComponent } from './MainPage/SearchBar/searchBar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TwitterComponent } from './MainPage/Twitter/twitter.component';
import { AuthGuardService } from './auth-guard.service';
import { UserArticlesComponent } from './user-articles/user-articles.component';
// import { SmallCardArticlesComponent } from './MainPage/SmallCard/small-card-articles.component';
import { RouterModule } from '@angular/router';
import { NewComponentComponent } from './new-component/new-component.component';
import { GitHubComponent } from './git-hub/git-hub.component';
import { ConnectionGitHubComponent } from './connection-git-hub/connection-git-hub.component';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeModule } from '@circlon/angular-tree-component';
import { SingleArticleComponent } from './SingleArticle/single-article.component';
import { ToastrModule } from 'ngx-toastr';
import { UsersManagementBlockComponent } from './AdminPage/users-management-block/users-management-block.component';
import { SafePipe } from './safe.pipe';
import { CreateNewArticleComponent } from './create-new-article/create-new-article.component';
import { CommentsComponent } from './SingleArticle/comments/comments.component';
import { MainAdminComponent } from './AdminPage/main-admin/main-admin.component';
import { AdminUsersComponent } from './AdminPage/admin-users/admin-users.component';
import { AdminArticlesComponent } from './AdminPage/admin-articles/admin-articles.component';
import { AdminCommentsComponent } from './AdminPage/admin-comments/admin-comments.component';
import { AdminTagsComponent } from './AdminPage/admin-tags/admin-tags.component';
import { AdminNewsletterComponent } from './AdminPage/admin-newsletter/admin-newsletter.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { DialogContentExampleDialog } from './user-profile/user-profile.component';
import {MatTableModule} from '@angular/material/table'; 
import { DatePipe } from '@angular/common';
import 'dotenv/config';

@NgModule({
  declarations: [
    AppComponent,
    SmallCardArticlesComponent,
    UsersManagementComponent,
    GooglemapComponent,
    TwitterComponent,
    TagsSidebarComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    GooglemapComponent,
    TwitterComponent,
    UserProfileComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserArticlesComponent,
    SmallCardArticlesComponent,
    SingleArticleComponent,
    UsersManagementBlockComponent,
    NewComponentComponent,
    GitHubComponent,
    ConnectionGitHubComponent,
    SingleArticleComponent,
    SafePipe,
    CommentsComponent,
    MainAdminComponent,
    AdminUsersComponent,
    AdminArticlesComponent,
    AdminCommentsComponent,
    AdminTagsComponent,
    AdminNewsletterComponent,
    CreateNewArticleComponent,
    UserFavoritesComponent,
    DialogContentExampleDialog
  ],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    MatSlideToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'xxx'
    }),
    FormsModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    PdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'xxx',
      clientId: 'xxx'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'xxx'
    }),
    NgxPageScrollCoreModule.forRoot({
      duration: 1500
    }),
    RouterModule.forRoot([
      { path: 'login', component: LoginPageComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: '**', component: LoginPageComponent }
    ]),

    ShareButtonModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    ToastrModule.forRoot(),
    NgbModule,
    TreeModule,
    MatTableModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [TwitterComponent],
  providers: [PdfViewerComponent,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'xxx'
            )
          },
        ]
      }
    }, AuthGuardService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

