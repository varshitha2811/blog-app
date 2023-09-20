import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from './search-list/search-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth.service';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { CookieService } from 'ngx-cookie-service';

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
    EditBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [BlogService,AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
