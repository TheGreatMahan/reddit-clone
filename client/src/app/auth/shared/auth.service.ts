import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private router: Router) {}

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/login',
        loginRequestPayload
      )
      .pipe(
        map((data: LoginResponse) => {
          localStorage.setItem('authenticationToken', data.authenticationToken);
          localStorage.setItem('username', data.username);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('expiresAt', data.expiresAt.toString());

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  logout() {
    this.httpClient
      .post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => throwError(() => new Error(error)),
      });

    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          localStorage.removeItem('authenticationToken');
          localStorage.removeItem('expiresAt');

          localStorage.setItem(
            'authenticationToken',
            response.authenticationToken
          );
          localStorage.setItem('expiresAt', response.expiresAt.toString());
        })
      );
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
