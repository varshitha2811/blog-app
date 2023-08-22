import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WriteComponent } from './write/write.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import these modules
import { HttpClientModule } from '@angular/common/http'; // Import this module
import { BlogService } from './blog.service';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { SearchListComponent } from './search-list/search-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WriteComponent,
    DisplayBlogComponent,
    SearchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
