import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; 
import { DisplayBlogComponent } from './display-blog/display-blog.component'; 
import { SearchListComponent } from './search-list/search-list.component';


const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }, 
   { path: 'home', component: HomePageComponent },
{ path: 'display-blog/:id', component: DisplayBlogComponent },
{ path: 'search-list/:tag', component: SearchListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
