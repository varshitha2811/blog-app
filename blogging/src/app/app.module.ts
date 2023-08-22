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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BlogFormComponent,
    DisplayBlogComponent,
    SearchListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,CommonModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
