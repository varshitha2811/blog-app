import { Injectable } from '@angular/core';

interface User {
  name: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'userData';

  constructor() { }

  signUp(newUser: User): void {
    const users = this.getStoredUsers();
    users.push(newUser);
    this.saveUsers(users);
  }

  login(username: string, password: string): boolean {
    const users = this.getStoredUsers();
    const user = users.find((u) => u.username === username && u.password === password);
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

  private getStoredUsers(): User[] {
    const usersString = localStorage.getItem(this.storageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  getUserByUsername(username: string): User | null {
    const users = this.getStoredUsers();
    const user = users.find((u) => u.username === username);
    return user ? { ...user } : null;
  }
}


