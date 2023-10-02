import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error loading users:', error);
      }
    );
  }

  disableProfile(userId: string): void {
    this.authService.disableProfile(userId).subscribe(
      (response) => {
        console.log(response);
        this.loadUsers(); 
      },
      (error) => {
        console.error('Error disabling profile:', error);
      }
    );
  }

  enableProfile(userId: string): void {
    this.authService.enableProfile(userId).subscribe(
      (response) => {
        console.log(response);
        this.loadUsers();
      },
      (error) => {
        console.error('Error enabling profile:', error);
      }
    );
  }
}
