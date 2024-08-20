import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map((data : LoginResponse) => {
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiresAt', data.expiresAt.toString());
        return true;
      }));
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('expiresAt');

        localStorage.setItem('authenticationToken',
          response.authenticationToken);
        localStorage.setItem('expiresAt', response.expiresAt.toString());
      }));
  }

  getUserName() {
    return localStorage.getItem('username');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
