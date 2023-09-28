
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export class UserProfile {
  FirstName:string='';
  LastName:string='';
  userName:string='';
  email: string = '';
  profilePicture: File | null = null;
}
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8080/profile';
  constructor(private http: HttpClient) { }
  createUserProfile(userprofile:UserProfile):Observable<any>{
    return this.http.post(`${this.apiUrl}`, userprofile);
  }
  updateUserProfile(username: string, userProfile: UserProfile): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}`, userProfile);
  }
  updateProfileWithPicture(username: string, userProfile: UserProfile, selectedFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.put(`${this.apiUrl}/${username}/updateProfileWithPicture`, formData);
  }
  getUserProfileByUsername(userName: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${userName}`);
  }
}