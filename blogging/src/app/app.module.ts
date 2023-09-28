import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogService } from './blog.service';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BlogFormComponent,
    DisplayBlogComponent,
    SearchListComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AngularEditorModule
  ],
  providers: [BlogService,AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
