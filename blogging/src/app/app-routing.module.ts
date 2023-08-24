import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { SearchListComponent } from './search-list/search-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { initFlowbite } from 'flowbite';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent },
  { path: 'display-blog/:index', component: DisplayBlogComponent },
  { path: 'search-list/:tag', component: SearchListComponent },
  { path: 'write-blog', component: BlogFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  {path: 'profile',component:ProfileComponent}];

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
