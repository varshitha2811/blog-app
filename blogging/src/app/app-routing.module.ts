import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminGuard } from './admin.guard';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { DisplayBlogComponent } from './display-blog/display-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path:" ", redirectTo:'blogs/home', pathMatch:'full' },
  { path: 'blogs/home', component: HomePageComponent },
  { path: 'blogs/:id', component: DisplayBlogComponent },
  { path: 'search-list/:tag', component: SearchListComponent },
  { path: 'blog/write-blog', component: BlogFormComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  {path: 'blog/profile',component:ProfileComponent},
  { path: 'edit-blog/:id' ,component: EditBlogComponent },
  { path: 'blog/user-management', component: AdminUserManagementComponent, canActivate: [AdminGuard] },

  ];

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
