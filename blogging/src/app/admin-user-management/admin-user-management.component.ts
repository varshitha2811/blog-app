import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {
  users: any;
  user:any;
  loginName: string = "";
  loginUserName: string = "";

  constructor(private adminService: AdminService,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data: any[]) => {
      this.user = data;
      this.loginName = this.user.name;
      this.loadAllUsers();
  });}

  loadAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(data); 
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  userlogout() {
    localStorage.removeItem("jwt_token");
    this.sessionService.endSession();
    this.router.navigate(['/login']);
  }
  disableProfile(userId: string): void {
    this.adminService.disableProfile(userId).subscribe(
      (response) => {
        console.log(response);
        this.loadAllUsers();
      },
      (error) => {
        console.error('Error disabling profile:', error);
      }
    );
  }
  enableProfile(userId: string): void {
    this.adminService.enableProfile(userId).subscribe(
      (response) => {
        console.log(response);
        this.loadAllUsers();
      },
      (error) => {
        console.error('Error enabling profile:', error);
      }
    );
  }
}
