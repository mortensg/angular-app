import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { LoginDetails } from 'src/app/models/login-details.model';

export type UserToken = {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLogged = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  constructor(private router: Router, private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
    this.isUserLogged.next(false);
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !(localStorage.getItem('token') === null);
  }

  requestAuth(loginDetails: LoginDetails): Observable<UserToken> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<UserToken>('https://dummyjson.com/auth/login', loginDetails, { headers }).pipe(
      map(res => {
        return {
          token: res.token
        }
      })
    );
  }

  requestRandomUser(): Observable<LoginDetails> {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    return this.http.get<LoginDetails>(`https://dummyjson.com/user/${randomNum}`).pipe(
      map(res => {
        return {
          username: res.username,
          password: res.password
        }
      }));
  }

}
