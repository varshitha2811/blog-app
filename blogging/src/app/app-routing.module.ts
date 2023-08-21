import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; 
import { DisplayBlogComponent } from './display-blog/display-blog.component'; 


const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }, 
   { path: 'home', component: HomePageComponent },
{ path: 'display-blog/:id', component: DisplayBlogComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
