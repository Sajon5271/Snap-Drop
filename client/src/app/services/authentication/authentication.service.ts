import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(user: {
    email: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(baseUrl + '/login', user);
  }
  register(user: {
    email: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      baseUrl + '/register',
      user
    );
  }

  oauthLogin(user: {
    name: string;
    email: string;
    profilePic: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      baseUrl + '/oauthLogin',
      user
    );
  }

  isLoggedIn(): boolean {
    const access_token = localStorage.getItem('userAccessToken');
    if (!access_token || this.jwtHelper.isTokenExpired(access_token))
      return false;
    return true;
  }

  userRole(): Observable<{ role: string }> {
    const jwtToken = this.jwtToken;
    if (jwtToken && !this.jwtHelper.isTokenExpired(jwtToken)) {
      return this.http.get<{ role: string }>(baseUrl + '/userType', {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      });
    } else {
      return of({ role: 'none' });
    }
  }
  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
