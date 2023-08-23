import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { SearchListComponent } from './search-list/search-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';


const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },

{ path: 'home', component: HomePageComponent },
{ path: 'display-blog/:id', component: DisplayBlogComponent },
{ path: 'search-list/:tag', component: SearchListComponent },
{ path: 'write-blog', component: BlogFormComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
