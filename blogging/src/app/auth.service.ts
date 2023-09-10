import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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

  signUp(name: string, username: string, password: string): void {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const user = { name, username, password: hashedPassword };
    const users = this.getStoredUsers();
    users.push(user);
    this.saveUsers(users);
  }

  login(username: string, password: string): boolean {
    const users = this.getStoredUsers();
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const user = users.find(u => u.username === username && u.password === hashedPassword);
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
