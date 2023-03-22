import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from '../interfaces/details.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  updateUserData(details: Details): Observable<User> {
    console.log(details)
    return this.http.put<User>(this.baseUrl, details, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
