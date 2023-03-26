import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lab } from 'src/app/interfaces/lab.interface';
import { Details } from '../../interfaces/details.interface';
import { User } from '../../interfaces/user.interface';
import { baseUrl } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private baseUrl = baseUrl;

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  updateUserData(details: Details): Observable<User> {
    console.log(details);
    return this.http.put<User>(this.baseUrl, details, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  getClosestLab(): Observable<Lab> {
    return this.http.get<Lab>('http://localhost:3000/pathao/closest-studio', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
