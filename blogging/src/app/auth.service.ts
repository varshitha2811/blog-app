import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'userData';

  constructor() {}

  signUp(name:string,username: string, password: string): void {
    const user = { name,username, password  };
    const users = this.getStoredUsers();
    users.push(user);
    this.saveUsers(users);
  }

  login(username: string, password: string): boolean {
    const users = this.getStoredUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  getLoggedInUser(): any {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  }

  private getStoredUsers(): any[] {
    const usersString = localStorage.getItem(this.storageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  getUserByUsername(username: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user: any) => user.username === username);
  }
}


