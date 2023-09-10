import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent },
  { path: 'display-blog/:index', component: DisplayBlogComponent },
  { path: 'search-list/:tag', component: SearchListComponent },
  { path: 'write-blog', component: BlogFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  {path: 'profile',component:ProfileComponent},
  { path: 'edit-blog/:index' ,component: EditBlogComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
 {
  ngOnInit(): void {
    initFlowbite();
  }
 }
