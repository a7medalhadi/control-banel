import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, timeout, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface UserDetails {
  _id: string;
  username: string;
  name: string;
  manager:boolean;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  password: string;
  name?: string;
}

export interface LogLoad {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `https://turkstore.herokuapp.com`

 private token : string

  constructor(private router: Router, public http: HttpClient) {
   
  }
  private saveToken(token: string): void {
    localStorage.setItem('mean-admin-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-admin-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?): Observable<any> {
    let base;
    if (type === 'register'){
      base = this.http.post(this.url+`/admins/${type}`, user,{ headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    if (type === 'login') {
      base = this.http.post(this.url+`/admins/${type}`, user);
    } 
    
    if(type === "profile") {
      base = this.http.get(this.url+`/admins/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token && type !=="register") {
          this.saveToken(data.token);
        }
        return data;
      }),
      retry(4)
    );
  
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  
  public login(user: LogLoad): Observable<any> {
    return this.request('post', 'login', user);
  }
  
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-admin-token');
    this.router.navigateByUrl('/login');
  }
}